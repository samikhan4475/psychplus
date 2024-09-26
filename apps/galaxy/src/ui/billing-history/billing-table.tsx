'use client'

import { Box, ScrollArea } from '@radix-ui/themes'
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
    <ScrollArea className="bg-white max-h-[46vh] max-w-[calc(100vw_-_190px)] rounded-1 p-2">
      <Box className="min-w-max">
        <DataTable
          columns={columns}
          data={data}
          theadClass="z-[1]"
          isRowSpan
          sticky
          disablePagination
        />
      </Box>
    </ScrollArea>
  )
}

export { BillingTable }
