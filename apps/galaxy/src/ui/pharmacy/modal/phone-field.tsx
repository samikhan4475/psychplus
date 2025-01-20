'use client'

import {
  FormFieldContainer,
  FormFieldLabel,
  PhoneNumberInput,
} from '@/components'

const PhoneNumberField = () => {
  return (
    <FormFieldContainer className="flex-col  gap-1">
      <FormFieldLabel>Phone Number</FormFieldLabel>
      <PhoneNumberInput field="pharmacyPhone" placeholder="Phone Number" />
    </FormFieldContainer>
  )
}

export { PhoneNumberField }
