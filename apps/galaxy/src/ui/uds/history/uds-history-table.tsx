'use client'

import { Box, ScrollArea } from '@radix-ui/themes'
import { ColumnDef, Row, Table } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { QuickNoteHistory } from '@/types'
import { formatDateTime } from '@/utils'
import { useStore } from './store'

const columns: ColumnDef<QuickNoteHistory>[] = [
  {
    accessorKey: 'createdOn',
    header: ({ column }) => (
      <ColumnHeader label="Date/time" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => (
      <TextCell>{formatDateTime(row?.original?.createdOn, false)}</TextCell>
    ),
  },
  {
    accessorKey: 'createdByFullName',
    header: ({ column }) => (
      <ColumnHeader sortable clientSideSort column={column} label="User" />
    ),
    cell: ({ row }) => (
      <TextCell className="truncate">
        {row?.original?.createdByFullName ?? 'N/A'}
      </TextCell>
    ),
  },
]

const UdsHistoryTable = () => {
  const { setSelectedRow, udsHistory } = useStore((state) => ({
    setSelectedRow: state.setSelectedRow,
    udsHistory: state.udsHistory,
  }))

  const onRowSelect = (
    row: Row<QuickNoteHistory>,
    table: Table<QuickNoteHistory>,
  ) => {
    table.setRowSelection({ [row.id]: true })
    setSelectedRow(row.original)
  }

  return (
    <ScrollArea
      className="h-full w-full max-w-[350px] pr-2.5"
      scrollbars="vertical"
    >
      <Box className="outline-pp outline-pp-table-border h-full w-full outline outline-1 -outline-offset-1">
        <DataTable
          columns={columns}
          data={udsHistory ?? []}
          onRowClick={onRowSelect}
          selectFirstRow={true}
          sticky
        />
      </Box>
    </ScrollArea>
  )
}

export { UdsHistoryTable }
