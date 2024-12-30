'use client'

import { CheckboxCell, PropsWithRow } from '@/components'
import { useStore } from '../store'
import { PatientVital } from '../types'

type AddToNoteCellProps = PropsWithRow<PatientVital>

const AddToNoteCell = ({ row }: AddToNoteCellProps) => {
  const checked = row.original.addToNote || false

  const handleAddToNote = useStore((state) => state.handleAddToNoteCheck)

  return (
    <CheckboxCell
      label={checked ? 'Yes' : 'No'}
      checked={checked}
      className="ml-[-3px]"
      onCheckedChange={(checked) => handleAddToNote(row.original.id, checked)}
      disabled={row.original.recordStatus !== 'Active'}
    />
  )
}

export { AddToNoteCell }
