import { Flex } from '@radix-ui/themes'
import { InboxNoteSignButton } from './inbox-note-sign-button'
import { AddendumButton } from './note-detail/addendum-button'
import { NotesRemoveConsignerButton } from './notes-remove-cosigner-button'
import { useStore } from './store'
import { Tabs } from './types'

const RightPanelActions = ({
  showButtons = true,
}: {
  showButtons?: boolean
}) => {
  const { setAddAddendum, tab } = useStore((state) => ({
    setAddAddendum: state.setAddAddendum,
    tab: state.tab,
  }))
  return (
    <Flex gap="2">
      <InboxNoteSignButton
        label={tab === Tabs.PENDING_NOTES ? 'Sign' : 'CoSign'}
      />
      {showButtons && <NotesRemoveConsignerButton />}
      {showButtons && <AddendumButton onClick={() => setAddAddendum(true)} />}
    </Flex>
  )
}

export { RightPanelActions }
