'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import {
  Box,
  Flex,
  Grid,
  Separator,
  Text,
  TextFieldInput,
} from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormField, PhoneNumberInput } from '@/components-v2'
import { ReferralType } from '../types'
import { DobInput } from './dob-input'
import { EmailInput } from './email-input'
import { SchemaType } from './schema'

const PatientInformation = () => {
  const form = useFormContext<SchemaType>()
  const { type: formType } = useParams<{ type: string }>()
  const heading =
    formType === ReferralType.Facility
      ? 'Patient Information'
      : formType === ReferralType.Payer
      ? 'Member Information'
      : 'Client Information'
  return (
    <Flex direction="column" gap="4">
      <Text size="5" weight="medium">
        {heading}
      </Text>
      <Separator className="bg-pp-gray-2 w-full" />
      <Grid columns="3" className="max-xs:grid-cols-1" gap="3">
        <FormField
          containerClassName="flex-1"
          name="patientName.firstName"
          label="First Name"
          required
        >
          <TextFieldInput
            {...form.register('patientName.firstName')}
            placeholder="First Name"
            className="h-[38px]"
          />
        </FormField>
        <FormField
          containerClassName="flex-1"
          name="patientName.lastName"
          label="Last Name"
          required
        >
          <TextFieldInput
            {...form.register('patientName.lastName')}
            placeholder="Last Name"
            className="h-[38px]"
          />
        </FormField>
        <FormField
          containerClassName="flex-1"
          name="patientContactDetails.phoneNumbers.0.number"
          label="Phone Number"
        >
          <PhoneNumberInput
            name="patientContactDetails.phoneNumbers.0.number"
            placeholder="000-000-0000"
            classNames="h-[38px] !text-2"
          />
        </FormField>
        <Box className="max-xs:col-span-full xs:col-span-3">
          <Grid columns="2" className="max-xs:grid-cols-1" gap="3">
            <DobInput />
            <EmailInput />
          </Grid>
        </Box>
      </Grid>
    </Flex>
  )
}

export { PatientInformation }
