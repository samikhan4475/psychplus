import React from 'react'
import { Row } from '@tanstack/react-table'
import { TextCell, TextInput } from '@/components'
import { LabResult } from '@/types'
import { useStore } from '../store'

interface TextFieldCellProps {
  row: Row<LabResult>
}

const NotesfieldCell = ({ row }: TextFieldCellProps) => {
  const { editAbleLabResults } = useStore()
  const isAddingOrEditing = editAbleLabResults?.id === row.original.id

  return isAddingOrEditing ? (
    <TextInput maxLength={128} field="labResults.physicianComments" />
  ) : (
    <TextCell>{row.original.physicianComments}</TextCell>
  )
}

export { NotesfieldCell }
