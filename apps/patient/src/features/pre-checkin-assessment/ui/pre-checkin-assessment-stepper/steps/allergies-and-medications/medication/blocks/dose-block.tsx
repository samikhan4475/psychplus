import React from 'react'
import Input from '../../../../shared-blocks/input'

const FIELD_ID = 'dose'
const DoseBlock = () => {
  return (
    <Input
      placeholder="Enter Dose"
      label="Name"
      field={FIELD_ID}
      className={'w-1/2'}
    />
  )
}
export default DoseBlock
