import React from 'react'
import { getPlaceholder } from '@/features/account/profile/utils'
import Input from '../../../../shared-blocks/input'

const FIELD_ID = 'address'

const AddressBlock = () => {
  return (
    <Input
      placeholder={getPlaceholder(FIELD_ID)}
      label="Address"
      field={FIELD_ID}
      required
      className="w-1/2"
      disabled
    />
  )
}

export { AddressBlock }
