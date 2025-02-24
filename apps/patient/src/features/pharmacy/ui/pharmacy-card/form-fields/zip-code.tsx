import React from 'react'
import { FormFieldInput } from '@/components-v2'
import { getPlaceholder } from '@/features/account/profile/utils'

const FIELD_ID = 'zipCode'

const ZipCodeField = () => {
  return (
    <FormFieldInput
      placeholder={getPlaceholder(FIELD_ID)}
      label="Zip Code"
      field={FIELD_ID}
      required
      className="w-1/4"
      disabled
    />
  )
}

export { ZipCodeField }
