'use client'

import { Button } from '@radix-ui/themes'
import { PenLineIcon } from 'lucide-react'
import { useHasPermission } from '@/hooks'
import { useStore } from './store'

const CreateNewNoteButton = () => {
  const { setIsCreateNoteView, setIsErrorAlertOpen, setErrorMessage } =
    useStore((state) => ({
      setErrorMessage: state.setErrorMessage,
      setIsErrorAlertOpen: state.setIsErrorAlertOpen,
      setIsCreateNoteView: state.setIsCreateNoteView,
    }))

  const createNotePermission = useHasPermission('createNewNoteButtonNotesPage')

  const onClick = () => {
    if (!createNotePermission) {
      setIsErrorAlertOpen(true)
      setErrorMessage(
        'You do not have permission to Create New Note. Please contact your supervisor if you need any further assistance.',
      )
      return
    }
    setIsCreateNoteView(true)
  }

  return (
    <Button size="1" highContrast type="button" onClick={onClick}>
      <PenLineIcon height={14} width={14} strokeWidth={2} />
      Create New Note
    </Button>
  )
}

export { CreateNewNoteButton }
