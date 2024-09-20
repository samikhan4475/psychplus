'use client'

import { Flex } from '@radix-ui/themes'
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
        <PhoneNumberInputBase
          field="physicianPhone"
          placeholder="Phone Number"
        />
        <FormFieldError name="physicianPhone" />
      </FormFieldContainer>
    </Flex>
  )
}

export { PhoneInput }
