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
    <Flex className="col-span-1">
      <FormFieldContainer className="w-full">
        <FormFieldLabel>Fax</FormFieldLabel>
        <PhoneNumberInputBase field="physicianFax" placeholder="Fax Number" />
        <FormFieldError name="physicianFax" />
      </FormFieldContainer>
    </Flex>
  )
}

export { FaxInput }
