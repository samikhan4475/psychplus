'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { PatientTransferSchemaType } from '../pateint-transfer-filter-form'


const EmailInput = () => {
  const form = useFormContext<PatientTransferSchemaType>()
  return (
    <Flex className="col-span-2">
      <FormFieldContainer className="flex-row items-center gap-1">
        <FormFieldLabel>Email</FormFieldLabel>
        <TextField.Root
          placeholder="Email"
          size="1"
          {...form.register('email')}
        />
        <FormFieldError name="email" />
      </FormFieldContainer>
    </Flex>
  )
}

export { EmailInput }
