import React from 'react'
import Input from '../../../../shared-blocks/input'

const FIELD_ID = 'pharmacyZipCode'

const ZipCodeBlock = () => {
  return (
    <Input
      placeholder="Mk"
      label="Zip Code"
      field={FIELD_ID}
      required
      className={'w-1/4'}
    />
  )
}

export default ZipCodeBlock
