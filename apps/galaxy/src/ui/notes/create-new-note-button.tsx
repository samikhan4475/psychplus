'use client'

import { Button } from '@radix-ui/themes'
import { PenLineIcon } from 'lucide-react'
import { useStore } from './store'

const CreateNewNoteButton = () => {
  const { setIsCreateNoteView } = useStore((state) => ({
    setIsCreateNoteView: state.setIsCreateNoteView,
  }))
  return (
    <Button
      size="1"
      highContrast
      type="button"
      onClick={() => setIsCreateNoteView(true)}
    >
      <PenLineIcon height={14} width={14} strokeWidth={2} />
      Create New Note
    </Button>
  )
}

export { CreateNewNoteButton }
