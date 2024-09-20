import React from 'react'
import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError, FormFieldLabel } from '@/components'

const NameInputField = () => {
  const form = useFormContext<any>()

  return (
    <Flex width="100%" gap="1">
      <FormFieldLabel className="!text-1">Name</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Search by name"
        className="h-[25px] w-full"
        {...form.register('Name')}
      />
      <FormFieldError name="Name" />
    </Flex>
  )
}

export { NameInputField }
