'use client'

import { Flex } from '@radix-ui/themes'
import { CodesetSelectCell, PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { PatientMedication } from '../types'

const PrescribedStatus = ({
  row: { original },
}: PropsWithRow<PatientMedication>) => {
  const {
    medicationDetails: { prescriptionStatus },
  } = original
  return (
    <Flex className="flex-1">
      <CodesetSelectCell
        codeset={CODESETS.PrescribedStatus}
        className="w-full"
        value={prescriptionStatus}
        disabled
      />
    </Flex>
  )
}

export { PrescribedStatus }
