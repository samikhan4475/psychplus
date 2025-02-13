'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { PcpSchemaType } from './pcp-schema'

const EmailInput = () => {
  const form = useFormContext<PcpSchemaType>()
  return (
    <Flex className="col-span-2">
      <FormFieldContainer className="w-full">
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
