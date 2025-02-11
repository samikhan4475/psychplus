import { PropsWithRow, TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Appointment } from '@/types'
import { getCodesetDisplayName } from '@/utils'
import { NonTimedVisitSequenceSelect } from './nontimed-visit-sequence-select'

const VisitSequenceSelectCell = ({
  row: { original: appointment },
}: PropsWithRow<Appointment>) => {
  const codes = useCodesetCodes(CODESETS.VisitSequenceType)
  if (appointment.isServiceTimeDependent) {
    return (
      <TextCell>
        {getCodesetDisplayName(appointment.visitSequence, codes)}
      </TextCell>
    )
  }
  return <NonTimedVisitSequenceSelect appointment={appointment} />
}

export { VisitSequenceSelectCell }
