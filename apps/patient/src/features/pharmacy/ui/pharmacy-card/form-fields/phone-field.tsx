import React from 'react'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  PhoneNumberInput,
} from '@/components-v2'
import { getPlaceholder } from '@/features/account/profile/utils'

const FIELD_ID = 'phoneNumber'

const PhoneField = () => {
  return (
    <FormFieldContainer className="w-1/4">
      <FormFieldLabel required>Phone Number</FormFieldLabel>
      <PhoneNumberInput
        name={FIELD_ID}
        placeholder={getPlaceholder(FIELD_ID)}
        disabled
      />
      <FormFieldError name={FIELD_ID} />
    </FormFieldContainer>
  )
}

export { PhoneField }
