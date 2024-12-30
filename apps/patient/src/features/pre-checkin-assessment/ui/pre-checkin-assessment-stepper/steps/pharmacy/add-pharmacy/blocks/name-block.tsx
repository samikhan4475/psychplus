import React from 'react'
import Input from '../../../../shared-blocks/input'

const FIELD_ID = 'pharmacyName'

const NameBlock = () => {
  return (
    <Input
      placeholder="Mk"
      label="Pharmacy Name"
      field={FIELD_ID}
      required
      className={'w-1/3'}
    />
  )
}

export default NameBlock
