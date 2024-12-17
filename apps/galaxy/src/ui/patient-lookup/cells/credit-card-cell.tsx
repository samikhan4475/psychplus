'use client'

import { PropsWithRow, TextCell } from '@/components'
import { Patient } from '../types'

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
