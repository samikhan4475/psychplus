'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { PatientLookUpSchemaType } from './schema'

const FirstNameInput = () => {
  const form = useFormContext<PatientLookUpSchemaType>()
  return (
    <FormFieldContainer className="gap-1">
      <Flex gap="1">
        <FormFieldLabel className="!text-1">First Name</FormFieldLabel>
        <TextField.Root
          size="1"
          placeholder="First name"
          className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
          {...form.register('firstName')}
        />
      </Flex>
      <FormFieldError name="firstName" />
    </FormFieldContainer>
  )
}

export { FirstNameInput }
