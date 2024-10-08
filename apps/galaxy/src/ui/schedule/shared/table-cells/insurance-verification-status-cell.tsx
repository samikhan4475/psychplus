import { CodesetSelectCell, PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { Appointment } from '@/types'

const InsuranceVerificationStatusCell = ({
  row: { original: appointment },
}: PropsWithRow<Appointment>) => {
  return (
    <CodesetSelectCell
      codeset={CODESETS.VerificationStatus}
      value={appointment.insuranceVerification}
    />
  )
}

export { InsuranceVerificationStatusCell }
