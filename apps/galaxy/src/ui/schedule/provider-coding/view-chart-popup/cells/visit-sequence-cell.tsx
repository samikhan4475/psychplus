import { PropsWithRow, TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Appointment } from '@/types'
import { getCodesetDisplayName } from '@/utils'

const VisitSequenceCell = ({
  row: { original: appointment },
}: PropsWithRow<Appointment>) => {
  const codes = useCodesetCodes(CODESETS.VisitSequence)
  const value = getCodesetDisplayName(appointment.visitSequence, codes)
  return <TextCell>{value}</TextCell>
}

export { VisitSequenceCell }
