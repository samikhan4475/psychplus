'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { ActionErrorState, ActionSuccessState } from '@psychplus-v2/api'
import { CODESETS } from '@psychplus-v2/constants'
import { getCalendarDate } from '@psychplus-v2/utils'
import { Box, Flex, Text, TextFieldInput } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { FormTextInput } from '@psychplus/form'
import { RadioGroup } from '@psychplus/ui/radio-group'
import {
  CodesetFormSelect,
  FormField,
  FormFieldContainer,
  FormFieldLabel,
  SSNInput,
  ToggleableForm,
} from '@/components-v2'
import { getBirthyear } from '@/features/account/profile/ui/account-profile-view/personal-info-card/utils'
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
import { PayerSelect } from './payer-select'
import { PlanSelect } from './plan-select'

const schema = z
  .object({
    payerName: z.string().min(1, 'Required'),
    insurancePlanId: z.string().min(1, 'Required'),
    effectiveDate: z.string(),
    terminationDate: z.string(),
    memberId: z.string().trim().min(1, 'Required').max(16, 'Invalid Member ID'),
    groupNumber: z
      .string()
      .trim()
      .min(1, 'Required')
      .max(16, 'Invalid Gruop Number'),
    isPatientPolicyHolder: z.boolean(),
    policyHolderFirstName: z.string().trim().optional(),
    policyHolderLastName: z.string().trim().optional(),
    policyHolderGender: z.string().optional(),
    policyHolderRelationship: z.string().optional(),
    insurancePolicyPriority: z.string().optional(),
    policyHolderDateOfBirth: z.string(),
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

    if ((data.terminationDate ?? '') === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Required',
        path: ['terminationDate'],
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
    } else if (getBirthyear(data.policyHolderDateOfBirth) < 18) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Must be at least 18 years of age',
        fatal: true,
        path: ['policyHolderDateOfBirth'],
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
  trigger?: any
  onFormClose?: () => void
}

const InsuranceForm = ({
  insurancePayers,
  insurancePriority,
  insurance,
  trigger,
  onFormClose,
}: InsuranceFormProps) => {
  const [cardFrontImage, setCardFrontImage] = useState<File | undefined>(
    undefined,
  )
  const [cardBackImage, setCardBackImage] = useState<File | undefined>(
    undefined,
  )

  const [maxDate, setMaxDate] = useState<string>('')
  const [minDate, setMinDate] = useState<string>('')

  useEffect(() => {
    const today = new Date()

    // Calculate max date (yesterday)
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)
    const formattedMaxDate = yesterday.toISOString().split('T')[0]
    setMaxDate(formattedMaxDate)

    // Set min date to today
    const formattedMinDate = today.toISOString().split('T')[0]
    setMinDate(formattedMinDate)
  }, [])

  const router = useRouter()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      payerName: insurance?.payerName ?? '',
      insurancePlanId: insurance?.insurancePlanId,
      effectiveDate: insurance?.effectiveDate
        ? getCalendarDate(insurance.effectiveDate).toString()
        : '',
      terminationDate: insurance?.terminationDate
        ? getCalendarDate(insurance.terminationDate).toString()
        : '',
      memberId: insurance?.memberId ?? '',
      groupNumber: insurance?.groupNumber ?? '',
      isPatientPolicyHolder: insurance?.isPatientPolicyHolder ?? true,
      policyHolderFirstName: insurance?.policyHolderName?.firstName ?? '',
      policyHolderLastName: insurance?.policyHolderName?.lastName ?? '',
      policyHolderGender: insurance?.policyHolderGender ?? '',
      policyHolderDateOfBirth: insurance?.policyHolderDateOfBirth
        ? getCalendarDate(insurance?.policyHolderDateOfBirth).toString()
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
      effectiveDate: data.effectiveDate,
      terminationDate: data.terminationDate,
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
        lastName: data.policyHolderLastName ?? '',
      }
      payload.policyHolderGender = data.policyHolderGender
      payload.policyHolderDateOfBirth = data.policyHolderDateOfBirth
      payload.policyHolderRelationship = data.policyHolderRelationship
      payload.policyHolderSocialSecurityNumber =
        data.policyHolderSocialSecurityNumber
    }

    if (!insurance) delete payload.id

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
        policyHolderLastName: '',
        policyHolderDateOfBirth: '',
        policyHolderGender: '',
        policyHolderRelationship: '',
        policyHolderSocialSecurityNumber: '',
      })
    }
  }

  const onSuccess = () => {
    router.refresh()
    onFormClose?.()
  }

  const onDeleteAction = () => deleteInsurance({ id: insurance?.id })

  return (
    <ToggleableForm
      form={form}
      onSuccess={onSuccess}
      trigger={trigger}
      submitAction={onSubmit}
      noResetValues
      onFormClose={onFormClose}
      toastData={{
        title: `Insurance ${insurance ? 'Updated' : 'Added'}`,
      }}
      deleteButtonProps={
        insurance
          ? {
              deleteAction: onDeleteAction,
              confirmTitle: 'Remove Insurance',
              confirmDescription:
                'Are you sure you want to remove this insurance?',
              confirmActionLabel: 'Remove',
              toastTitle: 'Insurance Removed',
              onSuccess: router.refresh,
            }
          : undefined
      }
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
          <FormFieldLabel required>Priority</FormFieldLabel>
          <FormField
            name="insurancePolicyPriority"
            label=""
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
          <FormField name="memberId" label="">
            <FormFieldLabel required>Member ID</FormFieldLabel>
            <TextFieldInput {...form.register('memberId')} />
          </FormField>
        </Box>
      </Flex>

      <Flex width="100%" gap="3">
        <Box className="flex-1">
          <FormField name="groupNumber" label="">
            <FormFieldLabel required>Group Number</FormFieldLabel>
            <TextFieldInput {...form.register('groupNumber')} />
          </FormField>
        </Box>
        <Box className="flex-1">
          <FormFieldLabel required>Effective Date</FormFieldLabel>
          <FormTextInput
            type="date"
            max={maxDate}
            label=""
            data-testid="effective-date-input"
            {...form.register('effectiveDate')}
            style={{ marginRight: 12 }}
            className="h-[32px] w-full rounded-2 text-4 text-[14px]"
          />
        </Box>
        <Box className="flex-1">
          <FormFieldLabel required>Termination Date</FormFieldLabel>
          <FormTextInput
            type="date"
            max="9999-12-31"
            min={minDate}
            label=""
            data-testid="termination-date-input"
            {...form.register('terminationDate')}
            style={{ marginRight: 12 }}
            className="h-[32px] w-full rounded-2 text-4 text-[14px]"
          />
        </Box>
        <Box className="flex-1">
          <FormFieldContainer
            align="start"
            justify="center"
            direction="column"
            className="mt-2 rounded-3 bg-[#F0F4FF] px-3 py-1.5"
          >
            <Box>
              <Text className="text-[11px] font-medium">
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
                {['Yes', 'No'].map((option) => (
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
          <Text size="5" className="mb-3 mt-6 font-bold text-[#151B4A]">
            Primary Insurance Holder Details
          </Text>

          <Flex gap="3" className="w-full">
            <Box className="flex-1">
              <FormField
                name="policyHolderFirstName"
                label=""
                containerClassName="flex-1"
              >
                <FormFieldLabel required>First Name</FormFieldLabel>
                <TextFieldInput {...form.register('policyHolderFirstName')} />
              </FormField>
            </Box>
            <Box className="flex-1">
              <FormField
                name="policyHolderLastName"
                label=""
                containerClassName="flex-1"
              >
                <FormFieldLabel required>Last Name</FormFieldLabel>
                <TextFieldInput {...form.register('policyHolderLastName')} />
              </FormField>
            </Box>
            <Box className="flex-1">
              <FormField
                name="policyHolderGender"
                label=""
                containerClassName="flex-1"
              >
                <FormFieldLabel required>Gender</FormFieldLabel>
                <CodesetFormSelect
                  name="policyHolderGender"
                  codeset={CODESETS.Gender}
                />
              </FormField>
            </Box>

            <Box className="flex-1">
              <FormFieldLabel required>Date of Birth</FormFieldLabel>
              <FormTextInput
                type="date"
                max="2004-12-31"
                label=""
                data-testid="dob-input"
                {...form.register('policyHolderDateOfBirth')}
                style={{ marginRight: 12 }}
                className="h-[32px] w-full rounded-2 text-4 text-[14px]"
              />
            </Box>
          </Flex>

          <Flex gap="3" className="w-full">
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
                label=""
                containerClassName="flex-1"
              >
                <FormFieldLabel required>Relationship</FormFieldLabel>
                <CodesetFormSelect
                  name="policyHolderRelationship"
                  codeset={CODESETS.InsuranceRelationship}
                />
              </FormField>
            </Box>
            <Box className="flex-1"></Box>
            <Box className="flex-1"></Box>
          </Flex>
        </>
      ) : null}
    </ToggleableForm>
  )
}

export { InsuranceForm, type SchemaType }
