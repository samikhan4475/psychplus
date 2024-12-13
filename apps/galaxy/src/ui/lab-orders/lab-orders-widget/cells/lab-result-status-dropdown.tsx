'use client'

import { useState } from 'react'
import { Row } from '@tanstack/react-table'
import { useFormContext } from 'react-hook-form'
import { SelectCell } from '@/components'
import { CODESETS } from '@/constants'
import { LabResult } from '@/types'
import { SchemaType } from '../schema'
import { ResultStatusCell } from './result-status-cell'

interface FlagStatusCellProps {
  row: Row<LabResult>
}

const LabResultStatusDropdown = ({ row }: FlagStatusCellProps) => {
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ]

  const form = useFormContext<SchemaType>()
  const isEditing = form.getValues('editingLabResultId') === row.original.id
  const handleStatusChange = (value: string) => {
    form.setValue(`labResults.${row.index}.recordStatus`, value)
  }

  return isEditing ? (
    <SelectCell
      className="w-full"
      value={form.watch(`labResults.${row.index}.recordStatus`)}
      options={options}
      onValueChange={handleStatusChange}
    />
  ) : (
    <ResultStatusCell row={row} />
  )
}

export { LabResultStatusDropdown }
