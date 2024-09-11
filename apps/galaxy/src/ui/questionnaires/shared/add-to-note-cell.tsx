'use client'

import { useState } from 'react'
import { CheckboxCell } from '@/components'

const AddToNoteCell = () => {
  const [addToNote, setAddToNote] = useState(false)

  return (
    <CheckboxCell
      label="Add to Note"
      checked={addToNote}
      onCheckedChange={(checked) => {
        setAddToNote(checked)
      }}
    />
  )
}

export { AddToNoteCell }
