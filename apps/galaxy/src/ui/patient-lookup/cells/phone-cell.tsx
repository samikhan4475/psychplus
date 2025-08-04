'use client'

import { PropsWithRow, TextCell } from '@/components'
import { cn, getMaskedPhoneNumber } from '@/utils'
import { Patient } from '../types'

const PhoneCell = ({ row: { original: patient } }: PropsWithRow<Patient>) => {
  const patientPhone = patient?.phoneNumber
  const isInvalidPhone = !patientPhone || patientPhone === '(000) 000-0000'
  const displayPhone = patientPhone || '0000000000'

  return (
    <TextCell className={cn('truncate', { 'text-red-9': isInvalidPhone })}>
      {getMaskedPhoneNumber(displayPhone)}
    </TextCell>
  )
}

export { PhoneCell }
