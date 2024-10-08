import { CodesetSelectCell, PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { Appointment } from '@/types'

const VisitSequenceSelectCell = ({
  row: { original: appointment },
}: PropsWithRow<Appointment>) => {
  return (
    <CodesetSelectCell
      codeset={CODESETS.VisitSequence}
      value={appointment.visitSequence}
    />
  )
}

export { VisitSequenceSelectCell }
