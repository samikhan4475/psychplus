'use client'

import { ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { columns } from './columns'
import { BillingHistory } from './types'

interface BillingTableProps {
  data: BillingHistory[]
  loading?: boolean
}
const BillingTable = ({ data = [], loading }: BillingTableProps) => {
  return loading ? (
    <LoadingPlaceholder className="h-full" />
  ) : (
    <ScrollArea className="h-full max-w-[calc(100vw_-_188px)] p-2">
      <DataTable
        columns={columns}
        data={data}
        theadClass="z-[1]"
        isRowSpan
        sticky
        disablePagination
      />
    </ScrollArea>
  )
}

export { BillingTable }
