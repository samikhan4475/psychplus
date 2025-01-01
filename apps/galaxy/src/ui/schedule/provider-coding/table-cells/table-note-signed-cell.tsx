import { Box } from '@radix-ui/themes'
import { PropsWithRow, TextCell } from '@/components'
import { MergedRecord, WeekDay } from '../types'

interface NoteSignedCellProps extends PropsWithRow<MergedRecord> {
  day: WeekDay
}

const NoteSignedCell = ({
  row: { original: appointment },
  day,
}: NoteSignedCellProps) => {
  const notesSignedStatus = appointment.weekDays[day.id]?.noteSignedStatus || ''

  return (
    <Box pl="1" width="100%">
      <TextCell>{notesSignedStatus}</TextCell>
    </Box>
  )
}

export { NoteSignedCell }
