import { PropsWithChildren } from 'react'
import { Flex } from '@radix-ui/themes'
import { NotesAddendumButton } from './notes-addendum-button'
import { NotesMarkErrorButton } from './notes-mark-error-button'
import { NotesRemoveConsignerButton } from './notes-remove-cosigner-button'
import { NotesSendCosignerButton } from './notes-send-consigner-button'

const LeftPanelActions = ({ children }: PropsWithChildren) => {
  return (
    <Flex wrap="wrap" className="gap-2">
      <NotesSendCosignerButton />
      <NotesMarkErrorButton />
      <NotesAddendumButton />
      <NotesRemoveConsignerButton />
      {children}
    </Flex>
  )
}

export { LeftPanelActions }
