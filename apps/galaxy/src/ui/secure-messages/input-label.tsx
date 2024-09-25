import React from 'react'
import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError, FormFieldLabel } from '@/components'
import { SchemaType } from './secure-messages-view'

const NameInputField = () => {
  const form = useFormContext<SchemaType>()

  return (
    <Flex width="100%" gap="1">
      <FormFieldLabel className="!text-1">Name</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Search by name"
        className="h-[24px] w-full"
        {...form.register('name')}
      />
      <FormFieldError name="name" />
    </Flex>
  )
}

export { NameInputField }
