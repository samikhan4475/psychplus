'use client'

import { Heading, ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { Pharmacy } from './types'
import { columns } from './columns'

interface CurrentPharmaciesTableProps {
  data: Pharmacy[]
  loading?: boolean
}
const CurrentPharmaciesTable = ({
  data = [],
  loading,
}: CurrentPharmaciesTableProps) => {
  return (
    <ScrollArea className="bg-white min-h-[150px] max-w-[calc(100vw_-_198px)] p-2">
      <Heading size="3" weight="medium" className="pb-1">
        Current Pharmacies
      </Heading>
      {loading ? (
        <LoadingPlaceholder className="bg-white min-h-[46vh]" />
      ) : (
        <DataTable
          columns={columns}
          data={data}
          theadClass=""
          isRowSpan
          sticky
          disablePagination
        />
      )}
    </ScrollArea>
  )
}

export { CurrentPharmaciesTable }
