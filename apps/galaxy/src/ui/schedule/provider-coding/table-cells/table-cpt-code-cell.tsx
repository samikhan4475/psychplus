import { PropsWithRow, TextCell } from '@/components'
import { DayString, MergedRecord, WeekDay } from '../types'

interface CptCodeCellProps extends PropsWithRow<MergedRecord> {
  day: WeekDay
}

const CptCodeCell = ({
  row: { original: appointment },
  day,
}: CptCodeCellProps) => {
  const cptCodes = appointment[day.id as DayString]?.cptCodes || []

  const cptCodeString = cptCodes.map((d: { code: string }) => d.code).join(', ')

  return <TextCell>{cptCodeString || ''}</TextCell>
}

export { CptCodeCell }
