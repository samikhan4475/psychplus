import { PropsWithRow } from '@/components'
import { Appointment } from '@/types'
import { NonTimedVisitStatusSelect } from './nontimed-visit-status-select'
import { TimedVisitStatusSelect } from './timed-visit-status-select'

const VisitStatusSelectCell = ({
  row: { original: appointment },
}: PropsWithRow<Appointment>) => {
  if (appointment.isServiceTimeDependent) {
    return <TimedVisitStatusSelect appointment={appointment} />
  }
  return <NonTimedVisitStatusSelect appointment={appointment} />
}

export { VisitStatusSelectCell }
