import React from 'react'
import { getPlaceholder } from '@/features/account/profile/utils'
import Input from '../../../../shared-blocks/input'

const FIELD_ID = 'zipCode'

const ZipCodeBlock = () => {
  return (
    <Input
      placeholder={getPlaceholder(FIELD_ID)}
      label="Zip Code"
      field={FIELD_ID}
      required
      className="w-1/4"
      disabled
    />
  )
}

export { ZipCodeBlock }
