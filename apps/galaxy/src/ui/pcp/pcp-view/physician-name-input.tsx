'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { AddressSchemaType } from './address-schema'

const PhysicianNameInput = () => {
  const form = useFormContext<AddressSchemaType>()
  return (
    <Flex className="col-span-2">
      <FormFieldContainer className="w-full">
        <FormFieldLabel>Physician Name</FormFieldLabel>
        <TextField.Root
          placeholder="Physician Name"
          size="1"
          {...form.register('physicianName')}
        />
        <FormFieldError name="physicianName" />
      </FormFieldContainer>
    </Flex>
  )
}

export { PhysicianNameInput }
