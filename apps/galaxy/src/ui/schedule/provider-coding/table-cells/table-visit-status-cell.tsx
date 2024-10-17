import { PropsWithRow, SelectCell, TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { DayString, MergedRecord, WeekDay } from '../types'

interface VisitStatusSelectCellProps extends PropsWithRow<MergedRecord> {
  day: WeekDay
}

const VisitStatusSelectCell = ({
  row: { original: appointment },
  day,
}: VisitStatusSelectCellProps) => {
  const visitStatus = appointment[day.id as DayString]?.visitStatus || ''
  const codes = useCodesetCodes(CODESETS.AppointmentStatus)
  const items = codes.map((code) => ({
    label: code.display,
    value: code.value,
  }))

  if (!visitStatus) {
    return <TextCell>{''}</TextCell>
  }
  return <SelectCell value={visitStatus} options={items} />
}

export { VisitStatusSelectCell }
