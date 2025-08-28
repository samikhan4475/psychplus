'use client'

import { Flex, Grid, Text, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { getUsStatesOptionsAction } from '@/actions'
import {
  AsyncSelect,
  DatePickerInput,
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
  NumericInput,
  PhoneNumberInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import {
  GUARDIAN_SELECT_OPTIONS,
  ORGANIZATION_TYPE_OPTIONS,
  YesNoOptions,
} from '../constants'
import { ContactInitiatedSelect } from './contact-initiated-select'
import { InsuranceSelect } from './insurance-select'
import { ExternalReferralSchemaType } from './schema'

const Filters = () => {
  const form = useFormContext<ExternalReferralSchemaType>()
  const options = useCodesetOptions(CODESETS.Gender)
  const statusOptions = useCodesetOptions(CODESETS.CustomerStatus)
  const nextDaysOptions = useCodesetOptions(CODESETS.QueryByNextDays)
  const pastDaysOptions = useCodesetOptions(CODESETS.QueryByLastDays)
  const servicesOptions = useCodesetOptions(CODESETS.ServicesOffered)
  const referralOptions = useCodesetOptions(CODESETS.ReferralSource)
  const patientStatuses = form.watch('patientStatuses')
  const patientCreatedFrom = form.watch('patientCreatedFrom')
  const services = form.watch('services')

  return (
    <Grid className="col-span-full" columns="4" gap="2" align="baseline">
      <FormFieldContainer className="gap-1">
        <Flex gap="1">
          <FormFieldLabel className="!text-1">First Name</FormFieldLabel>
          <TextField.Root
            size="1"
            placeholder="First name"
            className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
            {...form.register('patientPartialFirstName')}
          />
        </Flex>
      </FormFieldContainer>

      <FormFieldContainer className="gap-1">
        <Flex gap="1">
          <FormFieldLabel className="!text-1">Last Name</FormFieldLabel>
          <TextField.Root
            size="1"
            placeholder="Last name"
            className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
            {...form.register('patientPartialLastName')}
          />
        </Flex>
      </FormFieldContainer>

      <FormFieldContainer className="flex-row gap-1">
        <FormFieldLabel className="!text-1">Organization type</FormFieldLabel>
        <DropdownSelect
          field="organizationType"
          options={ORGANIZATION_TYPE_OPTIONS}
        />
      </FormFieldContainer>

      <FormFieldContainer className="gap-1">
        <Flex gap="1">
          <FormFieldLabel className="!text-1">Organization name</FormFieldLabel>
          <TextField.Root
            size="1"
            placeholder="Organization name"
            className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
            {...form.register('referrerPartialName')}
          />
        </Flex>
      </FormFieldContainer>

      <FormFieldContainer className="flex-row gap-1">
        <FormFieldLabel className="!text-1">User Status</FormFieldLabel>
        <MultiSelectField
          defaultValues={patientStatuses ?? []}
          options={statusOptions}
          onChange={(values) => form.setValue('patientStatuses', values)}
          className="flex-1"
        />
      </FormFieldContainer>

      <Grid columns="2" gap="2" align="baseline">
        <FormFieldContainer className="flex gap-1">
          <Flex gap="1">
            <FormFieldLabel className="!text-1">Age</FormFieldLabel>
            <NumericInput
              field="patientAge"
              allowNegative={false}
              prefix=""
              placeholder="Age"
              maxLimit={1000}
              decimalScale={0}
              containerClassName="w-full"
              className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
            />
          </Flex>
        </FormFieldContainer>

        <FormFieldContainer className="flex-row gap-1">
          <FormFieldLabel className="!text-1">Gender</FormFieldLabel>
          <DropdownSelect field="patientGender" options={options} />
        </FormFieldContainer>
      </Grid>

      <Grid columns="2" gap="2" align="baseline">
        <FormFieldContainer className="gap-1">
          <Flex gap="1">
            <FormFieldLabel className="!text-1">MRN</FormFieldLabel>
            <NumericInput
              field="patientExternalMrn"
              allowNegative={false}
              prefix=""
              placeholder="MRN"
              decimalScale={0}
              maxLimit={Number('9'.repeat(8))}
              containerClassName="w-full"
              className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
            />
          </Flex>
        </FormFieldContainer>
        <FormFieldContainer className="flex-row gap-1">
          <FormFieldLabel className="!text-1">DOB</FormFieldLabel>
          <DatePickerInput yearFormat="YYYY" field="patientDateOfBirth" />
        </FormFieldContainer>
      </Grid>

      <Grid columns="2" gap="2" align="baseline">
        <FormFieldContainer className="gap-1">
          <Flex gap="1">
            <FormFieldLabel className="!text-1">City</FormFieldLabel>
            <TextField.Root
              size="1"
              placeholder="City"
              className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
              {...form.register('patientCity')}
            />
          </Flex>
        </FormFieldContainer>
        <FormFieldContainer className="gap-1">
          <PhoneNumberInput
            field="patientPostalCode"
            placeholder="Zip"
            label="Zip code"
            format="#####"
            className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
          />
        </FormFieldContainer>
      </Grid>

      <Grid columns="2" gap="2" align="baseline">
        <FormFieldContainer className="flex-row gap-1">
          <FormFieldLabel className="!text-1">Guardian</FormFieldLabel>
          <DropdownSelect
            field="hasGuardian"
            options={GUARDIAN_SELECT_OPTIONS}
          />
        </FormFieldContainer>
        <FormFieldContainer className="gap-1">
          <PhoneNumberInput
            label="Phone"
            field="patientPhoneNumber"
            className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
            placeholder="Phone number"
          />
        </FormFieldContainer>
      </Grid>

      <FormFieldContainer className="gap-1">
        <Flex gap="1">
          <FormFieldLabel className="!text-1">Email</FormFieldLabel>
          <TextField.Root
            size="1"
            type="text"
            placeholder="Email"
            className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
            {...form.register('patientEmail')}
          />
        </Flex>
      </FormFieldContainer>

      <FormFieldContainer className="flex-row gap-1">
        <FormFieldLabel className="!text-1">State</FormFieldLabel>
        <AsyncSelect
          field="patientStateCode"
          placeholder="Select"
          size="1"
          fetchOptions={getUsStatesOptionsAction}
          buttonClassName="w-full h-6"
        />
      </FormFieldContainer>

      <FormFieldContainer className="flex-row gap-1">
        <FormFieldLabel className="!text-1">
          Referring Organization
        </FormFieldLabel>
        <DropdownSelect field="referrerShortName" options={referralOptions} />
      </FormFieldContainer>

      <InsuranceSelect />
      <FormFieldContainer className="flex-row gap-1">
        <FormFieldLabel className="!text-1">Service</FormFieldLabel>
        <MultiSelectField
          options={servicesOptions}
          defaultValues={services ?? []}
          className="flex-1"
          onChange={(values) => form.setValue('services', values)}
        />
      </FormFieldContainer>

      <FormFieldContainer className="flex-row items-center gap-1 ">
        <FormFieldLabel className="pt-1 !text-1">Service Date</FormFieldLabel>
        <Flex gap="2" className="flex-1" align="center">
          <Text className="pl-1 pt-1 text-1">From</Text>
          <DatePickerInput field="patientCreatedFrom" yearFormat="YYYY" />
          <Text className="pt-1 text-1">To</Text>
          <DatePickerInput
            field="patientCreatedTo"
            isDisabled={!patientCreatedFrom}
            minValue={patientCreatedFrom ?? undefined}
            yearFormat="YYYY"
          />
        </Flex>
      </FormFieldContainer>

      <ContactInitiatedSelect />

      <FormFieldContainer className="flex-row gap-1">
        <FormFieldLabel className="!text-1">Next Visit</FormFieldLabel>
        <DropdownSelect
          field="nextVisitStatus"
          options={nextDaysOptions}
          placeholder="Days"
        />
      </FormFieldContainer>
      <Grid columns="2" gap="2" align="baseline">
        <FormFieldContainer className="flex-row gap-1">
          <FormFieldLabel className="!text-1">Visit Hx</FormFieldLabel>
          <DropdownSelect
            field="pastVisitStatus"
            options={pastDaysOptions}
            placeholder="Days"
          />
        </FormFieldContainer>
        <FormFieldContainer className="flex-row gap-1">
          <FormFieldLabel className="!text-1">Linked</FormFieldLabel>
          <DropdownSelect field="isPatientLinked" options={YesNoOptions} />
        </FormFieldContainer>
      </Grid>
    </Grid>
  )
}

export { Filters }
