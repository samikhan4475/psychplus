'use client'

import { PropsWithRow, TextCell } from '@/components'
import { Patient } from '@/ui/patient-lookup/types'

const CreditCardCell = ({
  row: { original: patient },
}: PropsWithRow<Patient>) => {
  return (
    <TextCell>
      {patient?.creditCardVerificationStatus === 'Active' ? 'Yes' : 'No'}
    </TextCell>
  )
}

export { CreditCardCell }
