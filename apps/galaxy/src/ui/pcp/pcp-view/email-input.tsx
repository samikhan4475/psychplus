'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { AddressSchemaType } from './address-schema'

const EmailInput = () => {
  const form = useFormContext<AddressSchemaType>()
  return (
    <Flex className="col-span-2">
      <FormFieldContainer className="w-full">
        <FormFieldLabel>Email</FormFieldLabel>
        <TextField.Root
          placeholder="Email"
          size="1"
          {...form.register('physicianEmail')}
        />
        <FormFieldError name="physicianEmail" />
      </FormFieldContainer>
    </Flex>
  )
}

export { EmailInput }
