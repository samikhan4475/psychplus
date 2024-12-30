import React from 'react'
import { Row } from '@tanstack/react-table'
import { TextCell, TextInput } from '@/components'
import { LabResult } from '@/types'
import { useStore } from '../store'

interface TextFieldCellProps {
  row: Row<LabResult>
}

const RefRangefieldCell = ({ row }: TextFieldCellProps) => {
  const { editAbleLabResults } = useStore()
  const isAddingOrEditing = editAbleLabResults?.id === row.original.id

  return isAddingOrEditing ? (
    <TextInput maxLength={100} field={`labResults.recomendedValue`} />
  ) : (
    <TextCell>{row.original.recomendedValue}</TextCell>
  )
}

export { RefRangefieldCell }
