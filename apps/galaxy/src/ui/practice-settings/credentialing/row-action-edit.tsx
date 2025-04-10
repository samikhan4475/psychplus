'use client'

import { useState } from 'react'
import { Checkbox } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import { CredentialingManager } from '../types'
import { useStore } from './store'

const RowActionEdit = ({
  row: { original: record },
}: PropsWithRow<CredentialingManager>) => {
  const { setData, data } = useStore((state) => ({
    setData: state.setData,
    data: state.data,
  }))
  const [alert, setAlert] = useState(record.isAlertCheck)
  const handleCheckboxChange = (checked: boolean) => {
    const newData = data.map((item) => {
      if (item.id === record.id) {
        return {
          ...item,
          isAlertCheck: checked,
        }
      }
      return item
    })
    setData(newData)
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
