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
  const [selected, setSelected] = useState(checked)
  const handleCheckAllChange = () => {
    onSelectAllNormal(!selected)
    setSelected(!selected)
  }

  return (
    <CheckboxCell
      label="Check All Normal"
      checked={selected}
      onClick={handleCheckAllChange}
    />
  )
}

export { CheckAllNormalCell }
