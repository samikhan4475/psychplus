import { PropsWithRow, TextCell } from '@/components'
import { MergedRecord, WeekDay } from '../types'

interface TextCellProps extends PropsWithRow<MergedRecord> {
  day: WeekDay
  className?: string
}

const TableTextCell = ({
  row: { original: appointment },
  className,
  day,
}: TextCellProps) => {
  const visitType = appointment.weekDays[day.id]?.visitType || ''

  return <TextCell className={className}>{visitType ?? ''}</TextCell>
}

export { TableTextCell }
