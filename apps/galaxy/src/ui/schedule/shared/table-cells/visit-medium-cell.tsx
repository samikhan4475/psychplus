import { CodesetSelectCell, PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { Appointment } from '@/types'

const VisitMediumCell = ({
  row: { original: appointment },
}: PropsWithRow<Appointment>) => {
  return (
    <CodesetSelectCell
      value={appointment.visitMedium}
      codeset={CODESETS.VisitMedium}
    />
  )
}

export { VisitMediumCell }
