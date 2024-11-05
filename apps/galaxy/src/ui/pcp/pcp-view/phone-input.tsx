'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  PhoneNumberInput as PhoneNumberInputBase,
} from '@/components'

const PhoneInput = () => {
  return (
    <Flex className="col-span-2">
      <FormFieldContainer className="w-full">
        <FormFieldLabel>Phone</FormFieldLabel>
        <PhoneNumberInputBase field="phone" placeholder="Phone Number" />
        <FormFieldError name="phone" />
      </FormFieldContainer>
    </Flex>
  )
}

export { PhoneInput }
