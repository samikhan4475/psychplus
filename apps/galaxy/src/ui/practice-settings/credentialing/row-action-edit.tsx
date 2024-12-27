'use client'

import { type PropsWithRow } from '@/components'
import { Checkbox } from '@radix-ui/themes'
import { useState } from 'react'
import { Credentialing } from '../types'

const RowActionEdit = ({
  row: { original: record },
}: PropsWithRow<Credentialing>) => {
  const [alert, setAlert] = useState(true);
  const handleCheckboxChange = (checked: boolean) => {
    setAlert(checked)
  }
  return (
    <Checkbox
      checked={alert}
      onCheckedChange={(checked) => handleCheckboxChange(!!checked)}
      highContrast
      className="cursor-pointer"
    />
  )
}

export { RowActionEdit }
