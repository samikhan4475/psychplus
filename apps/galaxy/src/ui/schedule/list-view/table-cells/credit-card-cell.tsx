import { PropsWithRow, TextCell } from '@/components'
import { Appointment } from '@/types'

const CreditCardCell = ({
  row: { original: appointment },
}: PropsWithRow<Appointment>) => {
  return (
    <TextCell>
      {creditCardMap[appointment.creditCardVerificationStatus ?? '']}
    </TextCell>
  )
}

const creditCardMap: Record<string, string> = {
  Verified: 'Yes',
  Unverifiable: 'No',
  Pending: 'Pending',
}

export { CreditCardCell }
