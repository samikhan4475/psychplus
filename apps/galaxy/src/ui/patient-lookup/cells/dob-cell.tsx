'use client'

import { PropsWithRow, TextCell } from '@/components'
import { cn } from '@/utils'
import { Patient } from '../types'

const DOBCell = ({ row: { original: patient } }: PropsWithRow<Patient>) => {
  const isSpecificDate = patient?.dob === '01/01/2001'
  const isCreatedByGalaxy =
    patient?.metadata?.createdByFullName === 'Galaxy' &&
    patient?.metadata?.createdBy === 0
  const isRed = isSpecificDate && isCreatedByGalaxy

  return (
    <TextCell className={cn('truncate', { 'text-red-9': isRed })}>
      {patient?.dob}
    </TextCell>
  )
}

export { DOBCell }
