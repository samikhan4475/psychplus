'use client'

import { Flex } from '@radix-ui/themes'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  PhoneNumberInput as PhoneNumberInputBase,
} from '@/components'

const FaxInput = () => {
  return (
    <Flex className="col-span-2">
      <FormFieldContainer className="w-full">
        <FormFieldLabel required>Fax</FormFieldLabel>
        <PhoneNumberInputBase field="fax" placeholder="Fax Number" />
        <FormFieldError name="fax" />
      </FormFieldContainer>
    </Flex>
  )
}

export { FaxInput }
