'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  PhoneNumberInput as PhoneNumberInputBase,
} from '@/components'

const FaxInput = () => {
  return (
    <FormFieldContainer className="flex flex-col gap-1">
      <FormFieldLabel>Fax</FormFieldLabel>
      <PhoneNumberInputBase
        field="fax.number"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        placeholder="Fax"
      />
      <FormFieldError name="fax" />
    </FormFieldContainer>
  )
}

export { FaxInput }
