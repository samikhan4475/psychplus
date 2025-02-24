'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { ActionErrorState, ActionSuccessState } from '@psychplus-v2/api'
import { CODESETS } from '@psychplus-v2/constants'
import {
  getAgeFromDate,
  getCalendarDate,
  getCalendarDateLabel,
} from '@psychplus-v2/utils'
import {
  Box,
  Flex,
  Grid,
  RadioGroup,
  Text,
  TextFieldInput,
} from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import z from 'zod'
import {
  CodesetFormSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  FormHeading,
  SSNInput,
  ToggleableForm,
} from '@/components-v2'
import { getPlaceholder } from '@/features/account/profile/utils'
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
    effectiveDate: z.string().min(1, 'Required'),
    terminationDate: z.string().min(1, 'Required'),
    memberId: z.string().trim().min(1, 'Required').max(16, 'Invalid Member ID'),
    groupNumber: z
      .string()
      .trim()
      .min(1, 'Required')
      .max(16, 'Invalid Gruop Number'),
    isPatientPolicyHolder: z.boolean(),
    policyHolderFirstName: z
      .string()
      .max(28, 'Max 28 characters are allowed')
      .optional(),
    policyHolderLastName: z
      .string()
      .max(28, 'Max 28 characters are allowed')
      .optional(),
    policyHolderGender: z.string().optional().optional(),
    policyHolderRelationship: z.string().optional().optional(),
    insurancePolicyPriority: z.string().min(1, 'Required'),
    policyHolderDateOfBirth: z.string().optional(),
    policyHolderSocialSecurityNumber: z.string().optional(),
    hasCardFrontImage: z.boolean(),
    hasCardBackImage: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (!data.isPatientPolicyHolder) {
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
    }
  })

type SchemaType = z.infer<typeof schema>

interface InsuranceFormProps {
  insurancePayers: InsurancePayer[]
  insurancePriority?: InsurancePolicyPriority
  insurance?: Insurance
  trigger?: React.ReactNode
  onFormClose?: () => void
  isReadOnly?: boolean
  formHeading?: string
}

const InsuranceForm = ({
  insurancePayers,
  insurance,
  trigger,
  onFormClose,
  isReadOnly = false,
  formHeading,
}: InsuranceFormProps) => {
  const [cardFrontImage, setCardFrontImage] = useState<File | undefined>(
    undefined,
  )
  const [cardBackImage, setCardBackImage] = useState<File | undefined>(
    undefined,
  )

  const [maxDate, setMaxDate] = useState<string>('')
  const [minDate, setMinDate] = useState<string>('')

  const today = getCalendarDate()

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

  const getFormDefaultValues = (insurance?: Insurance) => ({
    payerName: insurance?.payerName ?? '',
    insurancePlanId: insurance?.insurancePlanId ?? '',
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
  })

  const hasChanges = () => {
    const currentValues = form.getValues()
    return Object.keys(getFormDefaultValues(insurance)).some((key) => {
      return (
        getFormDefaultValues[key as keyof typeof getFormDefaultValues] !==
        currentValues[key as keyof typeof currentValues]
      )
    })
  }

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    // defaultValues: { isPatientPolicyHolder: true }
    defaultValues: getFormDefaultValues(insurance),
  })
  const { register, watch, unregister, reset, clearErrors } = form
  const watchisPatientPolicyHolder = watch('isPatientPolicyHolder')

  useEffect(() => {
    if (!watchisPatientPolicyHolder) {
      register('policyHolderFirstName')
      register('policyHolderLastName')
      register('policyHolderDateOfBirth')
      register('policyHolderGender')
      register('policyHolderRelationship')
    } else {
      unregister('policyHolderFirstName')
      unregister('policyHolderLastName')
      unregister('policyHolderDateOfBirth')
      unregister('policyHolderGender')
      unregister('policyHolderRelationship')
    }
  }, [register, unregister, watchisPatientPolicyHolder])

  useEffect(() => {
    if (insurance) {
      reset(getFormDefaultValues(insurance))
    } else {
      reset({
        ...getFormDefaultValues(),
        isPatientPolicyHolder: true,
      })
    }
  }, [insurance, reset])

  const onSubmit = async (data: SchemaType) => {
    if (!hasChanges()) {
      onFormClose?.()
      return
    }

    const payload: InsuranceParams = {
      id: insurance?.id,
      payerName: data.payerName,
      insurancePlanId: data.insurancePlanId,
      effectiveDate: data.effectiveDate,
      terminationDate: data.terminationDate,
      memberId: data.memberId,
      groupNumber: data.groupNumber,
      isPatientPolicyHolder: data.isPatientPolicyHolder ?? 'Yes',
      insurancePolicyPriority: data.insurancePolicyPriority ?? 'Primary',
      hasCardFrontImage: data.hasCardFrontImage,
      hasCardBackImage: data.hasCardBackImage,
      isActive: true,
    }
    if (!data.isPatientPolicyHolder) {
      payload.policyHolderName = {
        firstName: data?.policyHolderFirstName ?? '',
        lastName: data?.policyHolderLastName ?? '',
      }
      payload.policyHolderGender = data?.policyHolderGender
      payload.policyHolderDateOfBirth = data?.policyHolderDateOfBirth
      payload.policyHolderRelationship = data?.policyHolderRelationship
      payload.policyHolderSocialSecurityNumber =
        data?.policyHolderSocialSecurityNumber
    }

    if (!insurance) delete payload.id

    const verificationStatus =
      insurance?.insurancePolicyPriority === data?.insurancePolicyPriority
        ? insurance?.verificationStatus
        : 'Pending'

    //handle the case where insurance is being edited
    const insuranceResponse = insurance
      ? await updateInsuranceAction({
          ...payload,
          verificationStatus: verificationStatus,
        })
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

  const onCheckedChange = (isPolicyHolder: boolean) => {
    if (isPolicyHolder) {
      clearErrors('policyHolderFirstName')
      clearErrors('policyHolderLastName')
      clearErrors('policyHolderDateOfBirth')
      clearErrors('policyHolderGender')
      clearErrors('policyHolderRelationship')
    }
    form.setValue('isPatientPolicyHolder', isPolicyHolder, {
      shouldValidate: true,
      shouldDirty: true,
    })
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
      <FormHeading title={formHeading ?? 'Add Insurance'} />
      <FormFieldContainer className="w-full">
        <FormFieldLabel>Insurance Card</FormFieldLabel>
        <Flex direction={{ initial: 'column', sm: 'row' }} width="100%" gap="3">
          <CardInput
            disabled={isReadOnly}
            label="Upload Image Front Side"
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
            disabled={isReadOnly}
            label="Upload Image Back Side"
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

      <Grid columns="4" gap="3" className="w-full">
        <FormFieldContainer>
          <FormFieldLabel required>Priority</FormFieldLabel>

          <CodesetFormSelect
            name="insurancePolicyPriority"
            codeset={CODESETS.InsurancePolicyPriority}
            placeholder="Select priority"
          />
          <FormFieldError name="insurancePolicyPriority" />
        </FormFieldContainer>

        <FormFieldContainer>
          <PayerSelect payers={insurancePayers} disabled={isReadOnly} />
        </FormFieldContainer>

        <FormFieldContainer>
          <PlanSelect payers={insurancePayers} disabled={isReadOnly} />
        </FormFieldContainer>

        <FormFieldContainer className="gap-[3px]">
          <FormFieldLabel required>Member ID</FormFieldLabel>
          <TextFieldInput
            className="h-[34px]"
            {...form.register('memberId')}
            placeholder="Enter member ID"
            maxLength={16}
            disabled={isReadOnly}
          />
          <FormFieldError name="memberId" />
        </FormFieldContainer>
      </Grid>

      <Flex width="100%" gap="3" mt="2">
        <FormFieldContainer className="flex-1">
          <FormFieldLabel required>Group Number</FormFieldLabel>
          <TextFieldInput
            className="h-[34px]"
            {...form.register('groupNumber')}
            placeholder={getPlaceholder('groupNumber')}
            maxLength={16}
            disabled={isReadOnly}
          />
          <FormFieldError name="groupNumber" />
        </FormFieldContainer>

        <FormFieldContainer className="flex-1">
          <FormFieldLabel required>Effective Date</FormFieldLabel>
          <TextFieldInput
            type="date"
            max={maxDate}
            data-testid="effective-date-input"
            {...form.register('effectiveDate')}
            className="mr-4 h-[34px] w-full rounded-2 text-[14px]"
            disabled={isReadOnly}
          />
          <FormFieldError name="effectiveDate" />
        </FormFieldContainer>

        <FormFieldContainer className="flex-1">
          <FormFieldLabel required>Termination Date</FormFieldLabel>
          <TextFieldInput
            type="date"
            max="9999-12-31"
            min={minDate}
            data-testid="termination-date-input"
            {...form.register('terminationDate')}
            disabled={isReadOnly}
            className="mr-4 h-[34px] w-full rounded-2 text-[14px]"
          />
          <FormFieldError name="terminationDate" />
        </FormFieldContainer>
        <Box className="flex-1"></Box>
      </Flex>

      <Box className="flex-1" mb="2">
        <FormFieldContainer
          align="start"
          justify="center"
          direction="column"
          className="mt-2 rounded-3 bg-[#F0F4FF] px-3 py-1.5"
        >
          <FormFieldLabel required>
            Are you the primary insurance holder
          </FormFieldLabel>
          <RadioGroup.Root
            id="isPatientPolicyHolder"
            value={String(form.watch('isPatientPolicyHolder'))}
            data-testid="signup-is-parent-or-guardian-input"
            defaultValue={String(true)}
            onValueChange={(value) => {
              const isPolicyHolder = value === 'true'
              onCheckedChange(isPolicyHolder)
            }}
            disabled={isReadOnly}
          >
            <Flex gap="4">
              {[
                { label: 'Yes', value: true },
                { label: 'No', value: false },
              ].map((option) => (
                <Text as="label" key={option.label} size="2">
                  <Flex gap="1">
                    <RadioGroup.Item value={String(option.value)} />
                    {option.label}
                  </Flex>
                </Text>
              ))}
            </Flex>
          </RadioGroup.Root>
        </FormFieldContainer>
      </Box>

      {!watchisPatientPolicyHolder ? (
        <>
          <Text size="5" className="mb-3 mt-3 font-bold text-[#151B4A]">
            Primary Insurance Holder Details
          </Text>

          <Flex gap="3" className="w-full">
            <FormFieldContainer className="flex-1 gap-[3px]">
              <FormFieldLabel required>First Name</FormFieldLabel>
              <TextFieldInput
                className="h-[34px]"
                {...form.register('policyHolderFirstName')}
                placeholder={getPlaceholder('firstName')}
              />
              <FormFieldError name="policyHolderFirstName" />
            </FormFieldContainer>

            <FormFieldContainer className="flex-1 gap-[3px]">
              <FormFieldLabel required>Last Name</FormFieldLabel>
              <TextFieldInput
                className="h-[34px]"
                {...form.register('policyHolderLastName')}
                placeholder={getPlaceholder('lastName')}
              />
              <FormFieldError name="policyHolderLastName" />
            </FormFieldContainer>

            <FormFieldContainer className="flex-1">
              <FormFieldLabel required>Gender</FormFieldLabel>
              <CodesetFormSelect
                size="2"
                name="policyHolderGender"
                placeholder="Select gender"
                codeset={CODESETS.Gender}
              />
              <FormFieldError name="policyHolderGender" />
            </FormFieldContainer>

            <FormFieldContainer className="flex-1">
              <FormFieldLabel required>Date of Birth</FormFieldLabel>
              <TextFieldInput
                type="date"
                min={getCalendarDateLabel(today.subtract({ years: 120 }))}
                max={getCalendarDateLabel(today.subtract({ years: 18 }))}
                data-testid="dob-input"
                {...form.register('policyHolderDateOfBirth')}
                className="mr-4 h-[34px] w-full rounded-2 text-[14px]"
              />
              <FormFieldError name="policyHolderDateOfBirth" />
            </FormFieldContainer>
          </Flex>

          <Flex gap="3" className="w-full">
            <FormFieldContainer className="flex-1 gap-[3px]">
              <FormFieldLabel>SSN</FormFieldLabel>
              <SSNInput
                name="policyHolderSocialSecurityNumber"
                size="2"
                placeholder="Enter SSN"
              />
              <FormFieldError name="policyHolderSocialSecurityNumber" />
            </FormFieldContainer>

            <FormFieldContainer className="flex-1">
              <FormFieldLabel required>Relationship</FormFieldLabel>
              <CodesetFormSelect
                name="policyHolderRelationship"
                placeholder="Select relationship"
                codeset={CODESETS.InsuranceRelationship}
                size="2"
              />
              <FormFieldError name="policyHolderRelationship" />
            </FormFieldContainer>

            <Box className="flex-1"></Box>
            <Box className="flex-1"></Box>
          </Flex>
        </>
      ) : null}
    </ToggleableForm>
  )
}

export { InsuranceForm, type SchemaType }
