'use client'

import { Flex, ScrollArea } from '@radix-ui/themes'
import { DataTable } from '@/components'
import { columns } from './columns'

const PrescriberHistoryTable = () => {
  return (
    <Flex direction="column" className="gap-1">
      <ScrollArea className="bg-white min-h-[150px] max-w-[calc(100vw_-_198px)] py-2">
        <DataTable
          columns={columns}
          data={[]}
          tdClass="!p-0"
          isRowSpan
          sticky
          disablePagination
          tableRowClass="border-b border-red-200"
        />
      </ScrollArea>
    </Flex>
  )
}

export { PrescriberHistoryTable }
