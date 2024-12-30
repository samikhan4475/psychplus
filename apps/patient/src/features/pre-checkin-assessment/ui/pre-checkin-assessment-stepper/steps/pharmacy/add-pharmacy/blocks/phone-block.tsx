import React from 'react'
import { FormFieldContainer, FormFieldLabel, PhoneNumberInput } from '@/components-v2'

const FIELD_ID = 'pharmacyNumber'

const PhoneBlock = () => {
  return (
    <FormFieldContainer className="w-1/4">
      <FormFieldLabel required>Phone Number</FormFieldLabel>
      <PhoneNumberInput name={FIELD_ID} />
    </FormFieldContainer>
  )
}

export default PhoneBlock
