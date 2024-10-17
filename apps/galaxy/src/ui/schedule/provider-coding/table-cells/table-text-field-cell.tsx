import { PropsWithRow, TextCell } from '@/components'
import { DayString, MergedRecord, WeekDay } from '../types'

interface TextCellProps extends PropsWithRow<MergedRecord> {
  day: WeekDay
}

const TableTextCell = ({
  row: { original: appointment },
  day,
}: TextCellProps) => {
  const visitType = appointment[day.id as DayString]?.visitType || ''

  return <TextCell>{visitType ?? ''}</TextCell>
}

export { TableTextCell }
