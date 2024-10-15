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
    <LoadingPlaceholder className="bg-white min-h-[46vh]" />
  ) : (
    <ScrollArea className="bg-white h-[calc(100dvh_-_360px)] max-w-[calc(100vw_-_198px)] p-2">
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
