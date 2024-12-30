import React from 'react'
import Input from '../../../../shared-blocks/input'

const FIELD_ID = 'pharmacyAddress'

const AddressBlock = () => {
  return (
    <Input
      placeholder="Mk"
      label="Address 1"
      field={FIELD_ID}
      required
      className={'w-1/2'}
    />
  )
}

export default AddressBlock
