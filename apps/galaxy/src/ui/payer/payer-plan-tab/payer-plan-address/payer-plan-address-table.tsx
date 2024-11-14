'use client'

import { ScrollArea } from '@radix-ui/themes'
import { DataTable } from '@/components'
import { columns, mockData } from './table-columns'

const PayerPlanAddressTable = () => {
  return (
    <ScrollArea>
      <DataTable data={mockData} columns={columns()} disablePagination sticky />
    </ScrollArea>
  )
}

export { PayerPlanAddressTable }
