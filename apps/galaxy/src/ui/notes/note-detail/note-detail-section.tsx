import { useEffect } from 'react'
import { Box, Flex, Heading, Text } from '@radix-ui/themes'
import { NoteIcon } from '@/components/icons/note-icon'
import { cn } from '@/utils'
import { NotesMarkErrorButton } from '../notes-mark-error-button'
import { NotesPrintButton } from '../notes-print-button'
import { NotesRemoveConsignerButton } from '../notes-remove-cosigner-button'
import { NotesSendCosignerButton } from '../notes-send-consigner-button'
import { RightPanelActions } from '../right-panel-actions'
import { useStore } from '../store'
import { AddendumButton } from './addendum-button'
import { AddendumForm } from './addendum-form'
import { NoteDetail } from './note-detail'

const NoteDetailsSection = () => {
  const { selectedRow, isInboxNotes, addAddendum, setAddAddendum } = useStore(
    (state) => ({
      selectedRow: state.selectedRow,
      addAddendum: state.addAddendum,
      isInboxNotes: state.isInboxNotes,
      setAddAddendum: state.setAddAddendum,
    }),
  )

  useEffect(() => {
    if (selectedRow === undefined) {
      setAddAddendum(false)
    }
  }, [selectedRow])

  return (
    <Box className="border-pp-gray-2 bg-white border-l border-r">
      <Flex
        wrap="wrap"
        className={cn('border-pp-gray-2 gap-2 border-b px-3 py-2.5', {
          'justify-between': isInboxNotes,
        })}
      >
        <Heading className="text-[18px] font-bold">Details</Heading>
        <Flex gap="2">
          {selectedRow !== undefined && (
            <>
              {isInboxNotes ? (
                <RightPanelActions />
              ) : (
                <Flex gap="2">
                  <NotesSendCosignerButton />
                  <NotesMarkErrorButton />
                  <AddendumButton onClick={() => setAddAddendum(true)} />
                  <NotesRemoveConsignerButton />
                </Flex>
              )}
            </>
          )}
          {!!selectedRow && <NotesPrintButton id="note-view-print" />}
        </Flex>
      </Flex>
      {selectedRow === undefined ? (
        <Flex direction="column" align="center" className="gap-y-1 py-3">
          <NoteIcon width={24} height={24} />
          <Text className="text-pp-gray-1 w-full text-center" size={'2'}>
            Please select Note to see details
          </Text>
        </Flex>
      ) : (
        <NoteDetail>
          {addAddendum && (
            <AddendumForm onCancel={() => setAddAddendum(false)} />
          )}
        </NoteDetail>
      )}
    </Box>
  )
}

export { NoteDetailsSection }
