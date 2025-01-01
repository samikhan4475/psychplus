import { PropsWithRow } from '@/components'
import { Appointment } from '@/types'
import { TimedVisitSequenceSelect } from './timed-visit-sequence-select'
import { NonTimedVisitSequenceSelect } from './nontimed-visit-sequence-select'

const VisitSequenceSelectCell = ({
  row: { original: appointment },
}: PropsWithRow<Appointment>) => {
  if (appointment.isServiceTimeDependent) {
    return <TimedVisitSequenceSelect appointment={appointment} />
  }
  return <NonTimedVisitSequenceSelect appointment={appointment} />
}

export { VisitSequenceSelectCell }
