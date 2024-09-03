import { useEffect, useState } from 'react'
import { Box, Flex, Heading, Text } from '@radix-ui/themes'
import { NoteIcon } from '@/components/icons/note-icon'
import { useStore } from '../store'
import { AddendumForm } from './addendum-form'
import { NoteDetail } from './note-detail'
import { NoteDetailAddendumButton } from './note-detail-addendum-button'
import { NoteDetailMarkErrorButton } from './note-detail-mark-error-button'
import { NoteDetailRemoveConsignerButton } from './note-detail-remove-cosigner-button'
import { NoteDetailSignButton } from './note-detail-send-sign-button'

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
    <Box className="border-pp-gray-2 bg-white border-l border-r">
      <Flex wrap="wrap" className="border-pp-gray-2 gap-2 border-b px-4 py-2.5">
        <Heading className="text-[18px] font-bold">Details</Heading>
        <NoteDetailSignButton />
        <NoteDetailMarkErrorButton />
        <NoteDetailAddendumButton onClick={() => setAddAddendum(true)} />
        <NoteDetailRemoveConsignerButton />
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
