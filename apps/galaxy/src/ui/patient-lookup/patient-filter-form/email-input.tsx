'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { PatientLookUpSchemaType } from './schema'

const EmailInput = () => {
  const form = useFormContext<PatientLookUpSchemaType>()
  return (
    <FormFieldContainer className="gap-1">
      <Flex gap="1">
        <FormFieldLabel className="!text-1">Email</FormFieldLabel>
        <TextField.Root
          size="1"
          type="text"
          placeholder="Email"
          className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
          {...form.register('email')}
        />
      </Flex>
      <FormFieldError name="email" />
    </FormFieldContainer>
  )
}

export { EmailInput }
