'use client'

import { useState } from 'react'
import { CheckboxCell } from '@/components'
import type { PatientAllergyRow } from '../types'

interface AddToNoteCellProps {
  row: PatientAllergyRow
}

const AddToNoteCell = ({ row }: AddToNoteCellProps) => {
  const [addToNote, setAddToNote] = useState(row.original.addToNote)

  return (
    <CheckboxCell
      label={addToNote ? 'Yes' : 'No'}
      checked={addToNote}
      onCheckedChange={(checked) => {
        setAddToNote(checked)
      }}
    />
  )
}

export { AddToNoteCell }
