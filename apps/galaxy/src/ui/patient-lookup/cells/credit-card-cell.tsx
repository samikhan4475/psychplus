'use client'

import { PropsWithRow, TextCell } from '@/components'
import { Patient } from '../types'

const CreditCardCell = ({
  row: { original: patient },
}: PropsWithRow<Patient>) => (
  <TextCell>
    {creditCardVerifyMap?.[patient?.creditCardVerificationStatus ?? '']}
  </TextCell>
)

const creditCardVerifyMap: Record<string, string> = {
  Verified: 'Yes',
  Unverifiable: 'No',
  Pending: 'Pending',
}
export { CreditCardCell }
