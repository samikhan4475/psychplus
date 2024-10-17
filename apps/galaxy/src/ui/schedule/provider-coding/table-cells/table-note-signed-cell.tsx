import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons'
import { Box } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { DayString, MergedRecord, WeekDay } from '../types'

interface NoteSignedCellProps extends PropsWithRow<MergedRecord> {
  day: WeekDay
}

const NoteSignedCell = ({
  row: { original: appointment },
  day,
}: NoteSignedCellProps) => {
  const isNoteSigned = appointment[day.id as DayString]?.isNoteSigned || ''

  return (
    <Box pl="1" width="100%">
      {isNoteSigned ? (
        <CheckCircledIcon className="text-pp-states-success" />
      ) : (
        <CrossCircledIcon className="text-pp-states-error" />
      )}
    </Box>
  )
}

export { NoteSignedCell }
