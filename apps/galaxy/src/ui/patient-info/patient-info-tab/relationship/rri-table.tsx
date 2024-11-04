'use client'

import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { ReleaseInformationHistory } from '@/types'
import { formatDateTime } from '@/utils'

const columns: ColumnDef<ReleaseInformationHistory>[] = [
  {
    id: 'user',
    header: () => <ColumnHeader label="User" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {original?.metadata?.createdByFullName}
      </TextCell>
    ),
  },
  {
    id: 'dataTime',
    header: () => <ColumnHeader label="Data/Time" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {original?.metadata?.createdOn
          ? formatDateTime(original?.metadata?.createdOn)
          : 'N/A'}
      </TextCell>
    ),
  },
  {
    id: 'status',
    header: () => <ColumnHeader label="Status" />,
    cell: ({ row: { original } }) => (
      <TextCell className="truncate">
        {original?.isAllowedToReleaseInformation ? 'Active' : 'InActive'}
      </TextCell>
    ),
  },
]

interface RRITable {
  data: ReleaseInformationHistory[]
}
const RRITable = ({ data }: RRITable) => {
  return (
    <ScrollArea scrollbars="vertical" className="max-h-28 p-2">
      <DataTable data={data ?? []} columns={columns} disablePagination sticky />
    </ScrollArea>
  )
}

export { RRITable }
