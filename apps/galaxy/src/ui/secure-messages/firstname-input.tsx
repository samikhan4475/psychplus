import React from 'react'
import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError, FormFieldLabel } from '@/components'
import { SchemaType } from './schema'

const FirstNameInput = () => {
  const form = useFormContext<SchemaType>()

  return (
    <Flex width="100%" gap="1">
      <FormFieldLabel className="!text-1">First Name</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Search by first name"
        className="h-[24px] w-full"
        {...form.register('firstName')}
      />
      <FormFieldError name="firstName" />
    </Flex>
  )
}

export { FirstNameInput }
