'use client'

import { Flex } from '@radix-ui/themes'
import { PhoneNumberInput as PhoneNumberInputBase } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const PhoneNumberInput = () => {
  return (
    <FormFieldContainer className="gap-1">
      <Flex gap="1">
        <FormFieldLabel className="!text-1">Phone No</FormFieldLabel>
        <PhoneNumberInputBase
          field="telephone"
          className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
          placeholder="Phone number"
        />
      </Flex>
      <FormFieldError name="telephone" />
    </FormFieldContainer>
  )
}

export { PhoneNumberInput }
