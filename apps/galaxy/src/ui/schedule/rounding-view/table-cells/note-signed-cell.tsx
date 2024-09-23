import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons'
import { Box } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { BookedAppointment } from '../../types/schedule'

const NoteSignedCell = ({
  row: { original: appointment },
}: PropsWithRow<BookedAppointment>) => {
  return (
    <Box pl="1" width="100%">
      {appointment.isNoteSigned ? (
        <CheckCircledIcon className="text-pp-states-success" />
      ) : (
        <CrossCircledIcon className="text-pp-states-error" />
      )}
    </Box>
  )
}

export { NoteSignedCell }
