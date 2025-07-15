'use client'

import React from 'react'
import {
  Box,
  Flex,
  Grid,
  Separator,
  Text,
  TextFieldInput,
} from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { AutoResizeInput, FormField, PhoneNumberInput } from '@/components-v2'
import { SchemaType } from './schema'

const ReferrerInformation = () => {
  const form = useFormContext<SchemaType>()
  return (
    <Flex direction="column" gap="4">
      <Text size="5" weight="medium" className="mt-5">
        Referring Organization
      </Text>
      <Separator className="bg-pp-gray-2 w-full" />
      <Grid columns="3" className="max-xs:grid-cols-1" gap="3">
        <FormField
          containerClassName="flex-1"
          name="referrerFacility"
          label="Facility Name"
        >
          <TextFieldInput
            {...form.register('referrerFacility')}
            placeholder="Facility Name"
            className="h-[38px]"
          />
        </FormField>
        <FormField
          containerClassName="flex-1"
          name="referrerName"
          label="Referrer Name"
        >
          <TextFieldInput
            {...form.register('referrerName')}
            placeholder="First Name"
            className="h-[38px]"
          />
        </FormField>
        <FormField
          containerClassName="flex-1"
          name="referrerContactDetails.phoneNumbers.0.number"
          label="Phone Number"
        >
          <PhoneNumberInput
            name="referrerContactDetails.phoneNumbers.0.number"
            classNames="h-[38px] !text-2"
            placeholder="000-000-0000"
          />
        </FormField>
        <FormField
          containerClassName="flex-1"
          name="referrerContactDetails.email"
          label="Email Address"
        >
          <TextFieldInput
            {...form.register('referrerContactDetails.email')}
            placeholder="Email Address"
            className="h-[38px]"
          />
        </FormField>
        <Box className="col-span-full">
          <FormField
            containerClassName="flex-1"
            name="additionalComments"
            label="Additional Information"
          >
            <AutoResizeInput
              field="additionalComments"
              maxLength={2048}
              className="min-h-16 rounded-none w-full px-3 py-2"
            />
          </FormField>
        </Box>
      </Grid>
    </Flex>
  )
}

export { ReferrerInformation }
