import { PropsWithRow, SelectCell, TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { DayString, MergedRecord, WeekDay } from '../types'

interface VisitSequenceSelectCellProps extends PropsWithRow<MergedRecord> {
  day: WeekDay
}

const VisitSequenceSelectCell = ({
  row: { original: appointment },
  day,
}: VisitSequenceSelectCellProps) => {
  const visitSequence = appointment[day.id as DayString]?.visitSequence || ''

  const codes = useCodesetCodes(CODESETS.VisitSequence)
  const items = codes.map((code) => ({
    label: code.display,
    value: code.value,
  }))
  if (!visitSequence) {
    return <TextCell>{''}</TextCell>
  }
  return <SelectCell value={visitSequence} options={items} />
}

export { VisitSequenceSelectCell }
