'use client'

import { Flex } from '@radix-ui/themes'
import { AlertDialog } from './alert-dialog'
import { CreateNoteView } from './create-note'
import { NotesHeader } from './notes-header'
import { NotesLayout } from './notes-layout'
import { useStore } from './store'

interface NotesViewProps {
  patientId: string
}

const NotesWidget = ({ patientId }: NotesViewProps) => {
  const { isCreateNoteView } = useStore((state) => ({
    isCreateNoteView: state.isCreateNoteView,
  }))

  return (
    <Flex direction="column" width="100%" px="1">
      {isCreateNoteView ? (
        <CreateNoteView />
      ) : (
        <>
          <NotesHeader />
          <NotesLayout />
        </>
      )}
      <AlertDialog />
    </Flex>
  )
}

export { NotesWidget }
