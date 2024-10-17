import { PropsWithRow, TextCell } from '@/components'
import { DayString, MergedRecord, WeekDay } from '../types'

interface CptCodeCellProps extends PropsWithRow<MergedRecord> {
  day: WeekDay
}

const DiagnosisCodesCell = ({
  row: { original: appointment },
  day,
}: CptCodeCellProps) => {
  const diagnosis = appointment[day.id as DayString]?.diagnosis || []

  const diaCodeString = diagnosis.map((d) => d.icd10Code).join(', ')

  return <TextCell>{diaCodeString || ''}</TextCell>
}

export { DiagnosisCodesCell }
