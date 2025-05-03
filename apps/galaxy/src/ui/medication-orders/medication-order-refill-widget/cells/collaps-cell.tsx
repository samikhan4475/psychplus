'use client'

import { Flex } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { MedicationHistoryDialog } from '../medication-history'
import { MedicationRefill } from '../types'

const CollapseCell = ({ row }: PropsWithRow<MedicationRefill>) => {
  return (
    <Flex
      justify="center"
      align="center"
      width="100%"
      height="100%"
      onClick={(e) => e.stopPropagation()}
    >
      <MedicationHistoryDialog
        pharmacyNotificationId={row.original.pharmacyNotificationId}
      />
    </Flex>
  )
}

export { CollapseCell }
