import React from 'react'
import { Row } from '@tanstack/react-table'
import { useFormContext } from 'react-hook-form'
import { TextCell, TextInput } from '@/components'
import { LabResult } from '@/types'
import { SchemaType } from '../schema'

interface TextFieldCellProps {
  row: Row<LabResult>
}

const ResultfieldCell = ({ row }: TextFieldCellProps) => {
  const form = useFormContext<SchemaType>()
  const isEditing = form.getValues('editingLabResultId') === row.original.id
  return isEditing ? (
    <TextInput field={`labResults.${row.index}.resultValue`} />
  ) : (
    <TextCell>{row.original.resultValue}</TextCell>
  )
}

export { ResultfieldCell }
