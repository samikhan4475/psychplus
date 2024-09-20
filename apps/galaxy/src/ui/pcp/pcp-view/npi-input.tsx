'use client'

import { Flex } from '@radix-ui/themes'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  PhoneNumberInput as PhoneNumberInputBase,
} from '@/components'

const NpiInput = () => {
  return (
    <Flex className="col-span-1">
      <FormFieldContainer className="w-full">
        <FormFieldLabel>Npi</FormFieldLabel>
        <PhoneNumberInputBase
          field="physicianNpi"
          placeholder="Npi Number"
          format="##########"
        />
        <FormFieldError name="physicianNpi" />
      </FormFieldContainer>
    </Flex>
  )
}

export { NpiInput }
