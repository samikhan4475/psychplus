import { Flex, Text } from '@radix-ui/themes'
import { CreateNewNoteButton } from './create-new-note-button'
import { NotesPrintButton } from './notes-print-button'

const NotesHeader = () => {
  return (
    <Flex
      direction="column"
      mb="1"
      className="bg-white z-10 shadow-1"
      position="sticky"
      top="0"
    >
      <Flex align="center" justify="between" wrap="wrap" p="2">
        <Text size="4" weight="medium">
          Notes
        </Text>
        <Flex gap="2" wrap="wrap">
          <NotesPrintButton />
          <CreateNewNoteButton />
        </Flex>
      </Flex>
    </Flex>
  )
}

export { NotesHeader }
