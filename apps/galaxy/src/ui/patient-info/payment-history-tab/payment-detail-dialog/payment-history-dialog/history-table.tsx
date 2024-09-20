'use client'

import { Box, ScrollArea } from '@radix-ui/themes'
import { DataTable } from '@/components'
import { PaymentHistoryData } from '../../types'
import { columns } from './table-columns'

const HistoryTable = () => {
  return (
    <ScrollArea className="max-h-96 pb-3">
      <Box className="w-max">
        <DataTable columns={columns} data={data} isRowSpan sticky />
      </Box>
    </ScrollArea>
  )
}
const data: PaymentHistoryData[] = [...Array(10)].map(() => ({
  date: '01/18/2023',
  time: '00:00:00',
  charge: 'Visit',
  visit: '00000869-00491',
  method: '',
  paymentDescription: '--',
  description: 'Est Pt, Outpatient Office Visit',
  transaction: '12636737377888',
  stripe: '1263673',
  coPay: {
    paid: '$150.00',
    duePP: '$150.00',
    duePT: '$150.00',
  },
  coIns: {
    paid: '$150.00',
    duePP: '$150.00',
    duePT: '$150.00',
  },
  balance: {
    paid: '$150.00',
    duePP: '$150.00',
    duePT: '$150.00',
  },
}))
export { HistoryTable }
