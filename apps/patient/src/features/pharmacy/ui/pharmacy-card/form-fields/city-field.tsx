import React from 'react'
import { FormFieldInput } from '@/components-v2'
import { getPlaceholder } from '@/features/account/profile/utils'

const FIELD_ID = 'city'

const CityField = () => {
  return (
    <FormFieldInput
      placeholder={getPlaceholder(FIELD_ID)}
      label="City"
      field={FIELD_ID}
      required
      className="w-1/4"
      disabled
    />
  )
}

export { CityField }
