'use client'

import { Button } from '@radix-ui/themes'
import { PenLineIcon } from 'lucide-react'

const CreateNoteSignButton = () => {
  return (
    <Button size="1" highContrast type="submit">
      <PenLineIcon height={14} width={14} strokeWidth={2} />
      Sign
    </Button>
  )
}

export { CreateNoteSignButton }
