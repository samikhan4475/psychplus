import { CodesetSelectCell, PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { Appointment } from '@/types'

const LegalSelectCell = ({
  row: { original: appointment },
}: PropsWithRow<Appointment>) => {
  return (
    <CodesetSelectCell
      codeset={CODESETS.LegalStatus}
      value={appointment.legalStatus}
    />
  )
}

export { LegalSelectCell }
