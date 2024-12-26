'use client'

import { ScrollArea } from '@radix-ui/themes'
import { DataTable } from '@/components'
import { columns } from './columns'
import { useStore } from './store'

const VisitTable = () => {
  const { visitsData } = useStore()

  return (
    <ScrollArea className="bg-white min-h-[150px] max-w-[calc(100vw_-_198px)] p-2">
      <DataTable
        columns={columns}
        data={visitsData?.visitsListData ?? []}
        tdClass="!p-0"
        isRowSpan
        sticky
        disablePagination
        tableRowClass="border-b border-red-200"
      />
    </ScrollArea>
  )
}

export { VisitTable }
