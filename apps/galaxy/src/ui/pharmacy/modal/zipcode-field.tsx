'use client'

import {
  FormFieldContainer,
  FormFieldLabel,
  PhoneNumberInput,
} from '@/components'

const ZipCodeField = () => {
  return (
    <FormFieldContainer className="flex-col  gap-1">
      <FormFieldLabel>Zip Code</FormFieldLabel>
      <PhoneNumberInput
        field="pharmacyZip"
        placeholder="ZIP Code"
        format="#####"
      />
    </FormFieldContainer>
  )
}

export { ZipCodeField }
