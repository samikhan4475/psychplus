'use client'

import { Flex } from '@radix-ui/themes'
import { Info } from 'lucide-react'
import { LongTextCell, PropsWithRow } from '@/components'
import { PatientMedication } from '../types'

const PharmacyCell = ({ row }: PropsWithRow<PatientMedication>) => {
  const { pharmacyName } = row.original.medicationDetails

  return (
    <Flex gap="1">
      {pharmacyName && <Info width={14} height={14} />}
      <LongTextCell>{pharmacyName ?? 'N/A'}</LongTextCell>
    </Flex>
  )
}

export { PharmacyCell }
