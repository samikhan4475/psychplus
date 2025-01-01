import { PropsWithRow, TextCell } from '@/components'
import { MergedRecord, WeekDay } from '../types'

interface CptCodeCellProps extends PropsWithRow<MergedRecord> {
  day: WeekDay
}

const CptCodeCell = ({
  row: { original: appointment },
  day,
}: CptCodeCellProps) => {
  const cptCodes = appointment.weekDays[day.id]?.cptCodes || []

  const cptCodeString = cptCodes.join(', ')

  return <TextCell>{cptCodeString || ''}</TextCell>
}

export { CptCodeCell }
