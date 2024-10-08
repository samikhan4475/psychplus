import { CodesetSelectCell, PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { Appointment } from '@/types'

const VisitStatusSelectCell = ({
  row: { original: appointment },
}: PropsWithRow<Appointment>) => {
  return (
    <CodesetSelectCell
      codeset={CODESETS.AppointmentStatus}
      value={appointment.visitStatus}
    />
  )
}

export { VisitStatusSelectCell }
