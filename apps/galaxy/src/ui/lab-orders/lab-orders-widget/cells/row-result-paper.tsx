'use client'

import { IconButton } from '@radix-ui/themes'
import { NotepadText } from 'lucide-react'

const RowResultPaper = () => {
  return (
    <IconButton size="1" color="gray" variant="ghost">
      <NotepadText width={16} height={16} color="black" />
    </IconButton>
  )
}

export { RowResultPaper }
