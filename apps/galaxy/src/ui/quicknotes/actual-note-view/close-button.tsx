'use client'

import { IconButton } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { useStore } from '../store'

const CloseButton = () => {
  const toggleActualNoteView = useStore((state) => state.toggleActualNoteView)
  return (
    <IconButton
      size="1"
      color="gray"
      variant="ghost"
      onClick={toggleActualNoteView}
    >
      <X className="fill-pp-icon-sub hover:fill-black" size={16} />
    </IconButton>
  )
}

export { CloseButton }
