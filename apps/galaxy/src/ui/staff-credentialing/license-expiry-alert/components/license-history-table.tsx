'use client'

import { Flex, ScrollArea } from '@radix-ui/themes'
import { DataTable } from '@/components'
import { License } from '../../types'
import { columns } from './columns'

const LicenseExpiryTable = ({ data }: { data: License[] }) => {
  return (
    <Flex direction="column" className="gap-1">
      <ScrollArea className="bg-white max-w-[calc(100vw_-_198px)] py-2">
        <DataTable
          columns={columns}
          data={data}
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

export { LicenseExpiryTable }
