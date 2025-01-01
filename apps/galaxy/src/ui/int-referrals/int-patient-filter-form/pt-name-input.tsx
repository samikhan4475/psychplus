'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { IntReferralsPatientLookUpSchemaType } from './schema'

const PtNameInput = () => {
  const form = useFormContext<IntReferralsPatientLookUpSchemaType>()
  return (
    <FormFieldContainer className="gap-1">
      <Flex gap="1">
        <FormFieldLabel className="!text-1">Patient name</FormFieldLabel>
        <TextField.Root
          size="1"
          placeholder="Name"
          className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
          {...form.register('name')}
        />
      </Flex>
      <FormFieldError name="name" />
    </FormFieldContainer>
  )
}

export { PtNameInput }
