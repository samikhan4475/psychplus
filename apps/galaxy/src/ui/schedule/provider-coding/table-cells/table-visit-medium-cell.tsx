import { PropsWithRow, SelectCell, TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { DayString, MergedRecord, WeekDay } from '../types'

interface VisitMediumSelectCellProps extends PropsWithRow<MergedRecord> {
  day: WeekDay
}

const VisitMediumSelectCell = ({
  row: { original: appointment },
  day,
}: VisitMediumSelectCellProps) => {
  const visitMedium = appointment[day.id as DayString]?.visitMedium || ''
  const codes = useCodesetCodes(CODESETS.VisitMedium)
  const items = codes.map((code) => ({
    label: code.display,
    value: code.value,
  }))

  if (!visitMedium) {
    return <TextCell>{''}</TextCell>
  }
  return <SelectCell value={visitMedium} options={items} />
}

export { VisitMediumSelectCell }
