import { Flex } from '@radix-ui/themes'
import { InboxNoteSignButton } from './inbox-note-sign-button'
import { AddendumButton } from './note-detail/addendum-button'
import { NotesMarkErrorButton } from './notes-mark-error-button'
import { NotesRemoveConsignerButton } from './notes-remove-cosigner-button'
import { useStore } from './store'
import { Tabs } from './types'

const RightPanelActions = ({
  showButtons = true,
}: {
  showButtons?: boolean
}) => {
  const { setAddAddendum, tab, isInboxNotes } = useStore((state) => ({
    setAddAddendum: state.setAddAddendum,
    tab: state.tab,
    isInboxNotes: state.isInboxNotes,
  }))
  const buttonToShow =
    isInboxNotes && tab === Tabs.PENDING_NOTES ? (
      <NotesMarkErrorButton />
    ) : (
      <NotesRemoveConsignerButton />
    )

  return (
    <Flex gap="2">
      <InboxNoteSignButton
        label={tab === Tabs.PENDING_NOTES ? 'Sign' : 'CoSign'}
      />
      {showButtons && buttonToShow}
      {showButtons && <AddendumButton onClick={() => setAddAddendum(true)} />}
    </Flex>
  )
}

export { RightPanelActions }
