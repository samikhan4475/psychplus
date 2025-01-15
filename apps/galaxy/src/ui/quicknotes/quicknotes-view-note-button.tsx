'use client'

import { Button, Text } from '@radix-ui/themes'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useStore } from './store'

const QuickNotesViewNoteButton = () => {
  const { toggleActualNoteView, showActualNoteView } = useStore((state) => ({
    toggleActualNoteView: state.toggleActualNoteView,
    showActualNoteView: state.showActualNoteView,
  }))
  return (
    <Button
      onClick={toggleActualNoteView}
      variant="outline"
      color="gray"
      size="1"
      className="text-black"
    >
      {showActualNoteView ? (
        <>
          <EyeOffIcon height={14} width={14} strokeWidth={1.5} />
          <Text>Hide Note</Text>
        </>
      ) : (
        <>
          <EyeIcon height={14} width={14} strokeWidth={1.5} />
          <Text>View Note</Text>
        </>
      )}
    </Button>
  )
}

export { QuickNotesViewNoteButton }
