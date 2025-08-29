import { useEffect, useState } from 'react'
import { CODESETS } from '@psychplus-v2/constants'
import { getCalendarDate, getCalendarDateLabel } from '@psychplus-v2/utils'
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
  SSNInput,
} from '@/components-v2'
import { getPlaceholder } from '@/features/account/profile/utils'
import { InsurancePayer } from '@/features/billing/payments/types'
import { PayerSelect } from '@/features/billing/payments/ui/insurance-card/payer-select'
import { PlanSelect } from '@/features/billing/payments/ui/insurance-card/plan-select'
import { getInsuranceSchema } from '@/features/billing/payments/ui/insurance-card/schema'

type SchemaType = z.infer<ReturnType<typeof getInsuranceSchema>>

interface InsuranceDetailsProps {
  isReadOnly: boolean
  insurancePayers: InsurancePayer[]
  watchisPatientPolicyHolder: boolean
  form: ReturnType<typeof useForm<SchemaType>>
  onCheckedChange: (isPolicyHolder: boolean) => void
  required?: boolean
}

const InsuranceDetails = ({
  isReadOnly,
  insurancePayers,
  watchisPatientPolicyHolder,
  form,
  onCheckedChange,
  required = true,
}: InsuranceDetailsProps) => {
  const today = getCalendarDate()

  const [maxDate, setMaxDate] = useState<string>('')
  const [minDate, setMinDate] = useState<string>('')

  useEffect(() => {
    const today = new Date()

    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)
    const formattedMaxDate = yesterday.toISOString().split('T')[0]
    setMaxDate(formattedMaxDate)

    const formattedMinDate = today.toISOString().split('T')[0]
    setMinDate(formattedMinDate)
  }, [])

  return (
    <>
      <Grid columns={{ initial: '1', md: '4' }} gap="3" className="w-full">
        <FormFieldContainer>
          <FormFieldLabel required={required}>Priority</FormFieldLabel>

          <CodesetFormSelect
            name="insurancePolicyPriority"
            codeset={CODESETS.InsurancePolicyPriority}
            placeholder="Select priority"
          />
          <FormFieldError name="insurancePolicyPriority" />
        </FormFieldContainer>

        <FormFieldContainer>
          <PayerSelect
            payers={insurancePayers}
            disabled={isReadOnly}
            required={required}
          />
        </FormFieldContainer>

        <FormFieldContainer>
          <PlanSelect
            payers={insurancePayers}
            disabled={isReadOnly}
            required={required}
          />
        </FormFieldContainer>

        <FormFieldContainer className="gap-[3px]">
          <FormFieldLabel required={required}>Member ID</FormFieldLabel>
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
      <Flex
        width="100%"
        gap="3"
        mt="2"
        direction={{ initial: 'column', md: 'row' }}
      >
        <FormFieldContainer className="flex-1">
          <FormFieldLabel required={required}>Group Number</FormFieldLabel>
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
          <FormFieldLabel required={required}>Effective Date</FormFieldLabel>
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
          <FormFieldLabel required={required}>Termination Date</FormFieldLabel>
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
    </>
  )
}

export default InsuranceDetails
