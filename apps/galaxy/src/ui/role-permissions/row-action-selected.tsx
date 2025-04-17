'use client'

import { useMemo, useState } from 'react'
import { CheckboxCell } from '@/components'
import { useStore } from './store'
import { Permission } from './types'

interface Props {
  record: Permission
  sectionCode: string
}

const RowActionSelected = ({ record, sectionCode }: Props) => {
  const { setSelectedPermissions, selectedPermissions } = useStore((state) => ({
    setSelectedPermissions: state.setSelectedPermissions,
    selectedPermissions: state.selectedPermissions,
  }))
  const isSelected = useMemo(() => {
    return selectedPermissions?.[sectionCode]?.includes(record.id)
  }, [selectedPermissions, sectionCode, record.id])
  const [checked, setChecked] = useState(isSelected)

  const onChange = (value: boolean) => {
    setChecked(value)
    const newList = selectedPermissions ?? {}
    let newSelectedPermissions = selectedPermissions[sectionCode] ?? []

    if (value) {
      newSelectedPermissions.push(record.id)
    } else {
      newSelectedPermissions = newSelectedPermissions.filter(
        (item) => item !== record.id,
      )
    }
    newList[sectionCode] = newSelectedPermissions
    setSelectedPermissions(newList)
  }

  return (
    <CheckboxCell
      checked={checked}
      onCheckedChange={onChange}
      className="h-[var(--chip-height)] !p-0"
    />
  )
}

export { RowActionSelected }
