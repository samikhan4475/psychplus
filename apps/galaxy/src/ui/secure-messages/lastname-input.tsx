import React from 'react'
import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError, FormFieldLabel } from '@/components'
import { SchemaType } from './schema'

const LastNameInput = () => {
  const form = useFormContext<SchemaType>()

  return (
    <Flex width="100%" gap="1">
      <FormFieldLabel className="!text-1">Last Name</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Search by Last Name"
        className="h-[24px] w-full"
        {...form.register('lastName')}
      />
      <FormFieldError name="lastName" />
    </Flex>
  )
}

export { LastNameInput }
