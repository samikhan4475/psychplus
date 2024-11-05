'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { PcpSchemaType } from './pcp-schema'

const LastNameInput = () => {
  const form = useFormContext<PcpSchemaType>()
  return (
    <Flex className="col-span-1">
      <FormFieldContainer className="w-full">
        <FormFieldLabel>Last Name</FormFieldLabel>
        <TextField.Root
          placeholder="Last Name"
          size="1"
          {...form.register('lastName')}
        />
        <FormFieldError name="physicianName" />
      </FormFieldContainer>
    </Flex>
  )
}

export { LastNameInput }
