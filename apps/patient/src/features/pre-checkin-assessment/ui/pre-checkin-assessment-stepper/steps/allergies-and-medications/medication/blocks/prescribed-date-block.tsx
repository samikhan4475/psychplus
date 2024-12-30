import React from 'react'
import Input from '../../../../shared-blocks/input'

const FIELD_ID = 'prescribedDate'

const PrescribedDateBlock = () => {
  return (
    <Input
      placeholder="MM/DD/YYYY"
      label="Prescribed Date"
      field={FIELD_ID}
      className={'w-1/2'}
      max="9999-12-31"
      type="date"
    />
  )
}

export default PrescribedDateBlock
