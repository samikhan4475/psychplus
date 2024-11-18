'use client'

import { useState } from 'react'
import { CheckboxCell } from './checkbox-cell'

const CheckAllNormalCell = ({
  onSelectAllNormal,
  checked,
}: {
  checked: boolean
  onSelectAllNormal: (checked: boolean) => void
}) => {
  const handleCheckAllChange = () => {
    onSelectAllNormal(!checked)
  }

  return (
    <CheckboxCell
      label="Check All Normal"
      checked={checked}
      onClick={handleCheckAllChange}
    />
  )
}

export { CheckAllNormalCell }
