import { Flex, Text } from '@radix-ui/themes'
import { Appointment } from '@/types'
import { CreateNewNoteButton } from './create-new-note-button'
import { useStore } from './store'

const NotesHeader = ({
  noteAppointment,
  heading,
}: {
  noteAppointment?: Appointment
  heading?: string
}) => {
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
          {heading ? heading : 'Notes'}
        </Text>
        {noteAppointment && (
          <Flex gap="2" wrap="wrap">
            <CreateNewNoteButton />
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export { NotesHeader }
