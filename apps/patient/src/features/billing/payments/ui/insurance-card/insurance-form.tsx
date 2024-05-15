'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { ActionErrorState, ActionSuccessState } from '@psychplus-v2/api'
import { CODESETS } from '@psychplus-v2/constants'
import {
  getAgeFromDate,
  getCalendarDate,
  getPaddedDateString,
} from '@psychplus-v2/utils'
import { Checkbox, Flex, TextFieldInput } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useForm } from 'react-hook-form'
import z from 'zod'
import {
  CodesetFormSelect,
  DobInput,
  FieldPlaceholder,
  FormField,
  FormFieldContainer,
  FormFieldLabel,
  SSNInput,
  ToggleableForm,
} from '@/components-v2'
import { Insurance, InsurancePayer } from '@/features/billing/payments/types'
import {
  deleteInsurance,
  updateInsuranceAction,
  uploadInsuranceCard,
} from '../../actions'
import {
  addInsuranceAction,
  InsuranceParams,
} from '../../actions/add-insurance'
import { InsurancePolicyPriority } from '../../constants'
import { CardInput } from './card-input'
import { EffectiveDateInput } from './effective-date-input'
import { InsuranceFormTrigger } from './Insurance-form-trigger'
import { PayerSelect } from './payer-select'
import { PlanSelect } from './plan-select'

const schema = z
  .object({
    payerName: z.string().min(1, 'Required'),
    insurancePlanId: z.string().min(1, 'Required'),
    effectiveDate: z.custom<DateValue>().or(z.literal('')),
    memberId: z.string().trim().min(1, 'Required'),
    groupNumber: z.string().trim().min(1, 'Required'),
    isPatientPolicyHolder: z.boolean(),
    policyHolderFirstName: z.string().trim().optional(),
    policyHolderLastName: z.string().trim().optional(),
    policyHolderGender: z.string().optional(),
    policyHolderRelationship: z.string().optional(),
    policyHolderDateOfBirth: z
      .custom<DateValue>()
      .optional()
      .or(z.literal(''))
      .optional(),
    policyHolderSocialSecurityNumber: z.string().optional(),
    hasCardFrontImage: z.boolean(),
    hasCardBackImage: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (
      data.effectiveDate === '' ||
      data.effectiveDate === null ||
      data.effectiveDate === undefined
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Required',
        path: ['effectiveDate'],
      })
    }

    if (data.isPatientPolicyHolder) {
      return true
    }

    if (!data.policyHolderFirstName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Required',
        path: ['policyHolderFirstName'],
      })
    }

    if (!data.policyHolderLastName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Required',
        path: ['policyHolderLastName'],
      })
    }

    if (
      data.policyHolderDateOfBirth === '' ||
      data.policyHolderDateOfBirth === null ||
      data.policyHolderDateOfBirth === undefined
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Required',
        fatal: true,
        path: ['policyHolderDateOfBirth'],
      })
    } else if (getAgeFromDate(data.policyHolderDateOfBirth) < 18) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Must be at least 18 years of age',
        fatal: true,
        path: ['policyHolderDateOfBirth'],
      })
    }

    if (!data.policyHolderSocialSecurityNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Required',
        path: ['policyHolderSocialSecurityNumber'],
      })
    } else if (data.policyHolderSocialSecurityNumber?.length !== 9) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid SSN',
        path: ['policyHolderSocialSecurityNumber'],
      })
    }

    if (!data.policyHolderGender) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Required',
        path: ['policyHolderGender'],
      })
    }

    if (!data.policyHolderRelationship) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Required',
        path: ['policyHolderRelationship'],
      })
    }
  })

type SchemaType = z.infer<typeof schema>

interface InsuranceFormProps {
  insurancePayers: InsurancePayer[]
  insurancePriority?: InsurancePolicyPriority
  insurance?: Insurance
}

const InsuranceForm = ({
  insurancePayers,
  insurancePriority,
  insurance,
}: InsuranceFormProps) => {
  const [cardFrontImage, setCardFrontImage] = useState<File | undefined>(
    undefined,
  )
  const [cardBackImage, setCardBackImage] = useState<File | undefined>(
    undefined,
  )

  const router = useRouter()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      payerName: insurance?.payerName ?? '',
      insurancePlanId: insurance?.insurancePlanId ?? '',
      effectiveDate: insurance?.effectiveDate
        ? getCalendarDate(insurance?.effectiveDate)
        : '',
      memberId: insurance?.memberId ?? '',
      groupNumber: insurance?.groupNumber ?? '',
      isPatientPolicyHolder: insurance?.isPatientPolicyHolder ?? true,
      policyHolderFirstName: insurance?.policyHolderName?.firstName ?? '',
      policyHolderLastName: insurance?.policyHolderName?.lastName ?? '',
      policyHolderGender: insurance?.policyHolderGender ?? '',
      policyHolderDateOfBirth: insurance?.policyHolderDateOfBirth
        ? getCalendarDate(insurance?.policyHolderDateOfBirth)
        : '',
      policyHolderRelationship: insurance?.policyHolderRelationship ?? '',
      policyHolderSocialSecurityNumber:
        insurance?.policyHolderSocialSecurityNumber ?? '',
      hasCardFrontImage: insurance?.hasCardFrontImage ?? false,
      hasCardBackImage: insurance?.hasCardBackImage ?? false,
    },
  })

  const onSubmit = async (data: SchemaType) => {
    const payload: InsuranceParams = {
      id: insurance?.id,
      payerName: data.payerName,
      insurancePlanId: data.insurancePlanId,
      effectiveDate: data.effectiveDate
        ? getPaddedDateString(data.effectiveDate)
        : '',
      memberId: data.memberId,
      groupNumber: data.groupNumber,
      isPatientPolicyHolder: data.isPatientPolicyHolder,
      insurancePolicyPriority: insurancePriority ?? 'Primary',
      hasCardFrontImage: data.hasCardFrontImage,
      hasCardBackImage: data.hasCardBackImage,
      isActive: true,
    }

    if (!data.isPatientPolicyHolder) {
      payload.policyHolderName = {
        firstName: data.policyHolderFirstName ?? '',
        lastName: data.policyHolderFirstName ?? '',
      }
      payload.policyHolderGender = data.policyHolderGender
      payload.policyHolderDateOfBirth = data.policyHolderDateOfBirth
        ? getPaddedDateString(data.policyHolderDateOfBirth)
        : ''
      payload.policyHolderRelationship = data.policyHolderRelationship
      payload.policyHolderSocialSecurityNumber =
        data.policyHolderSocialSecurityNumber
    }

    //handle the case where insurance is being edited
    const insuranceResponse = insurance
      ? await updateInsuranceAction(payload)
      : await addInsuranceAction(payload)

    if (insuranceResponse.state === 'error') {
      return {
        state: 'error',
        error: insuranceResponse.error,
      } as ActionErrorState
    }

    const cardUploadPromises = []
    if (cardFrontImage) {
      cardUploadPromises.push(
        uploadInsuranceCard({
          file: cardFrontImage,
          side: 'Front',
          policyId: insuranceResponse.data.id,
        }),
      )
    }

    if (cardBackImage) {
      cardUploadPromises.push(
        uploadInsuranceCard({
          file: cardBackImage,
          side: 'Back',
          policyId: insuranceResponse.data.id,
        }),
      )
    }

    const cardUploadResponse = await Promise.all(cardUploadPromises)

    if (cardUploadResponse.some((r) => !r.ok)) {
      return {
        state: 'error',
        error:
          "'Could not upload insurance card images Please try again later.'",
      } as ActionErrorState
    }

    return {
      state: 'success',
    } as ActionSuccessState
  }

  const onCheckedChange = (checked: boolean) => {
    form.setValue('isPatientPolicyHolder', checked)

    if (checked) {
      form.reset({
        ...form.getValues(),
        policyHolderFirstName: '',
        policyHolderLastName: '',
        policyHolderDateOfBirth: '',
        policyHolderGender: '',
        policyHolderRelationship: '',
        policyHolderSocialSecurityNumber: '',
      })
    }
  }

  const trigger = insurance ? (
    <InsuranceFormTrigger insurance={insurance} />
  ) : (
    <FieldPlaceholder>+ add insurance</FieldPlaceholder>
  )

  const onDeleteAction = async () => {
    if (!insurance) {
      return {
        state: 'error',
        error: 'Insurance not found',
      } as ActionErrorState
    }

    return deleteInsurance(insurance?.id ?? '')
  }

  return (
    <ToggleableForm
      form={form}
      onSuccess={router.refresh}
      trigger={trigger}
      submitAction={onSubmit}
      noResetValues
      deleteButtonProps={
        insurance
          ? {
              deleteAction: onDeleteAction,
              confirmTitle: 'Remove Insurance',
              confirmDescription:
                'Are you sure you want to remove this insurance?',
              confirmActionLabel: 'Remove',
              tooltip: 'Remove insurance',
              toastTitle: 'Insurance removed',
              onSuccess: router.refresh,
            }
          : undefined
      }
      contentClassName="mb-2 p-4 border-y border-dashed border-y-gray-5"
    >
      <FormFieldContainer className="w-full">
        <FormFieldLabel>Insurance Card</FormFieldLabel>
        <Flex direction={{ initial: 'column', sm: 'row' }} width="100%" gap="3">
          <CardInput
            label="Front Side"
            savedImg={
              insurance && form.watch('hasCardFrontImage')
                ? `/api/patients/self/policies/${insurance.id}/cardimage/front`
                : undefined
            }
            onImageChanged={(image) => {
              form.setValue(
                'hasCardFrontImage',
                !form.getValues('hasCardFrontImage'),
              )
              setCardFrontImage(image)
            }}
          />
          <CardInput
            label="Back Side"
            savedImg={
              insurance && form.watch('hasCardBackImage')
                ? `/api/patients/self/policies/${insurance.id}/cardimage/back`
                : undefined
            }
            onImageChanged={(image) => {
              form.setValue(
                'hasCardBackImage',
                !form.getValues('hasCardBackImage'),
              )
              setCardBackImage(image)
            }}
          />
        </Flex>
      </FormFieldContainer>
      <Flex gap="3">
        <PayerSelect payers={insurancePayers} />
        <PlanSelect payers={insurancePayers} />
      </Flex>
      <EffectiveDateInput />
      <Flex gap="3">
        <FormField name="memberId" label="Member ID">
          <TextFieldInput {...form.register('memberId')} />
        </FormField>
        <FormField name="groupNumber" label="Group Number">
          <TextFieldInput {...form.register('groupNumber')} />
        </FormField>
      </Flex>
      <FormFieldContainer
        align="center"
        gap="2"
        direction="row"
        className="mt-2 rounded-3 border border-gray-5 bg-gray-2 p-3"
      >
        <Checkbox
          id="isPatientPolicyHolder"
          size="3"
          checked={form.watch('isPatientPolicyHolder')}
          onCheckedChange={onCheckedChange}
          highContrast
        />
        <FormFieldLabel id="isPatientPolicyHolder">
          Patient is policyholder
        </FormFieldLabel>
      </FormFieldContainer>

      {!form.watch('isPatientPolicyHolder') ? (
        <>
          <Flex gap="3" className="w-full">
            <FormField
              name="policyHolderFirstName"
              label="First Name"
              containerClassName="flex-1"
            >
              <TextFieldInput {...form.register('policyHolderFirstName')} />
            </FormField>
            <FormField
              name="policyHolderLastName"
              label="Last Name"
              containerClassName="flex-1"
            >
              <TextFieldInput {...form.register('policyHolderLastName')} />
            </FormField>
          </Flex>
          <Flex gap="3" className="w-full">
            <FormField
              name="policyHolderRelationship"
              label="Relationship"
              containerClassName="flex-1"
            >
              <CodesetFormSelect
                name="policyHolderRelationship"
                codeset={CODESETS.InsuranceRelationship}
              />
            </FormField>
            <FormField
              name="policyHolderGender"
              label="Gender"
              containerClassName="flex-1"
            >
              <CodesetFormSelect
                name="policyHolderGender"
                codeset={CODESETS.Gender}
              />
            </FormField>
          </Flex>
          <Flex gap="3" className="w-full">
            <FormField name="policyHolderDateOfBirth" label="Date of Birth">
              <DobInput name="policyHolderDateOfBirth" />
            </FormField>

            <FormField
              name="policyHolderSocialSecurityNumber"
              label="SSN"
              containerClassName="flex-1"
            >
              <SSNInput name="policyHolderSocialSecurityNumber" size="2" />
            </FormField>
          </Flex>
        </>
      ) : null}
    </ToggleableForm>
  )
}

export { InsuranceForm, type SchemaType }
