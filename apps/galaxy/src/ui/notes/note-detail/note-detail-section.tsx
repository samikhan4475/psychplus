import { useEffect, useState } from 'react'
import { Box, Flex, Heading, Text } from '@radix-ui/themes'
import { NoteIcon } from '@/components/icons/note-icon'
import { NotesMarkErrorButton } from '../notes-mark-error-button'
import { NotesPrintButton } from '../notes-print-button'
import { NotesRemoveConsignerButton } from '../notes-remove-cosigner-button'
import { NotesSendCosignerButton } from '../notes-send-consigner-button'
import { useStore } from '../store'
import { AddendumButton } from './addendum-button'
import { AddendumForm } from './addendum-form'
import { NoteDetail } from './note-detail'

const NoteDetailsSection = () => {
  const { selectedRow } = useStore((state) => ({
    selectedRow: state.selectedRow,
  }))

  const [addAddendum, setAddAddendum] = useState<boolean>(false)

  useEffect(() => {
    if (selectedRow === undefined) {
      setAddAddendum(false)
    }
  }, [selectedRow])

  return (
    <Box
      id="note-view-print"
      className="border-pp-gray-2 bg-white border-l border-r"
    >
      <Flex wrap="wrap" className="border-pp-gray-2 gap-2 border-b px-3 py-2.5">
        <Heading className="text-[18px] font-bold">Details</Heading>
        <NotesSendCosignerButton />
        <NotesMarkErrorButton />
        <AddendumButton onClick={() => setAddAddendum(true)} />
        <NotesRemoveConsignerButton />
        {!!selectedRow && <NotesPrintButton id="note-view-print" />}
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
