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
import { Box, Flex, Text, TextFieldInput } from '@radix-ui/themes'
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
import { TerminationDateInput } from './termination-date-input'
import { RadioGroup } from '@psychplus/ui/radio-group'

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
    policyHolderMiddleName: z.string().trim().optional(),
    policyHolderGender: z.string().optional(),
    policyHolderRelationship: z.string().optional(),
    insurancePolicyPriority: z.string().optional(),
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

    if (!data.insurancePolicyPriority) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Required',
        path: ['insurancePolicyPriority'],
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
      insurancePolicyPriority: insurance?.insurancePolicyPriority ?? '',
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

  const onCheckedChange = (value: string) => {
    form.setValue('isPatientPolicyHolder', value === 'Yes')

    if (value === 'Yes') {
      form.reset({
        ...form.getValues(),
        policyHolderFirstName: '',
        policyHolderMiddleName: '',
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

  return (
    <ToggleableForm
      form={form}
      onSuccess={router.refresh}
      trigger={trigger}
      submitAction={onSubmit}
      noResetValues
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
      <Flex gap="3" width="100%">
        <Box className="flex-1">
          <FormField
            name="insurancePolicyPriority"
            label="Priority"
            containerClassName="flex-1"
          >
            <CodesetFormSelect
              name="insurancePolicyPriority"
              codeset={CODESETS.InsurancePolicyPriority}
            />
          </FormField>
        </Box>
        <Box className="flex-1">
          <PayerSelect payers={insurancePayers} />
        </Box>
        <Box className="flex-1">
          <PlanSelect payers={insurancePayers} />
        </Box>
        <Box className="flex-1">
          <FormField name="memberId" label="Member ID">
            <TextFieldInput {...form.register('memberId')} />
          </FormField>
        </Box>
      </Flex>

      <Flex width="100%" gap="3">
        <Box className="flex-1">
          <FormField name="groupNumber" label="Group Number">
            <TextFieldInput {...form.register('groupNumber')} />
          </FormField>
        </Box>
        <Box className="flex-1">
          <EffectiveDateInput />
        </Box>
        <Box className="flex-1">
          <TerminationDateInput />
        </Box>
        <Box className="flex-1">
          <FormFieldContainer
            align="start"
            justify="center"
            direction="column"
            className="mt-2 rounded-3 bg-[#F0F4FF] px-3 py-1.5"
          >
            <Box>
              <Text className="font-medium text-[11px]">
                Are you the primary insurance holder
              </Text>
            </Box>

            <RadioGroup.Root
              id="isPatientPolicyHolder"
              value={form.watch('isPatientPolicyHolder') ? 'Yes' : 'No'}
              data-testid="signup-is-parent-or-guardian-input"
              onValueChange={(value) => {
                onCheckedChange(value)
              }}
            >
              <Flex gap="4">
                {['No', 'Yes'].map((option) => (
                  <Text as="label" key={option} size="2">
                    <Flex gap="1">
                      <RadioGroup.Item value={option} />
                      {option}
                    </Flex>
                  </Text>
                ))}
              </Flex>
            </RadioGroup.Root>
          </FormFieldContainer>
        </Box>
      </Flex>

      {!form.watch('isPatientPolicyHolder') ? (
        <>
          <Text size="5" className="text-[#151B4A] font-bold mt-6 mb-3">
            Primary Insurance Holder Details
          </Text>

          <Flex gap="3" className="w-full">
            <Box className="flex-1">
              <FormField
                name="policyHolderFirstName"
                label="First Name"
                containerClassName="flex-1"
              >
                <TextFieldInput {...form.register('policyHolderFirstName')} />
              </FormField>
            </Box>
            <Box className="flex-1">
              <FormField
                name="policyHolderMiddleName"
                label="Middle Name"
                containerClassName="flex-1"
              >
                <TextFieldInput {...form.register('policyHolderMiddleName')} />
              </FormField>
            </Box>
            <Box className="flex-1">
              <FormField
                name="policyHolderLastName"
                label="Last Name"
                containerClassName="flex-1"
              >
                <TextFieldInput {...form.register('policyHolderLastName')} />
              </FormField>
            </Box>
            <Box className="flex-1">
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
            </Box>
          </Flex>

          <Flex gap="3" className="w-full">
            <Box className="flex-1">
              <FormField name="policyHolderDateOfBirth" label="Date of Birth">
                <DobInput name="policyHolderDateOfBirth" />
              </FormField>
            </Box>
            <Box className="flex-1">
              <FormField
                name="policyHolderSocialSecurityNumber"
                label="SSN"
                containerClassName="flex-1"
              >
                <SSNInput name="policyHolderSocialSecurityNumber" size="2" />
              </FormField>
            </Box>
            <Box className="flex-1">
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
            </Box>
            <Box className="flex-1"></Box>
          </Flex>
        </>
      ) : null}
    </ToggleableForm>
  )
}

export { InsuranceForm, type SchemaType }
