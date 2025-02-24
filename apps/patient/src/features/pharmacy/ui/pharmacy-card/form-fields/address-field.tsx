import React from 'react'
import { FormFieldInput } from '@/components-v2'
import { getPlaceholder } from '@/features/account/profile/utils'

const FIELD_ID = 'address'

const AddressField = () => {
  return (
    <FormFieldInput
      placeholder={getPlaceholder(FIELD_ID)}
      label="Address"
      field={FIELD_ID}
      required
      className="w-1/2"
      disabled
    />
  )
}

export { AddressField }
