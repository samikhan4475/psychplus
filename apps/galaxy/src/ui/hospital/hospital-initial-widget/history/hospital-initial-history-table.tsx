'use client'

import { Box, ScrollArea } from '@radix-ui/themes'
import { ColumnDef, Row, Table } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { QuickNoteHistory } from '@/types'
import { formatDateTime } from '@/utils'
import { useStore } from './store'

const columns: ColumnDef<QuickNoteHistory>[] = [
  {
    accessorKey: 'metadata.createdOn',
    header: ({ column }) => (
      <ColumnHeader label="Date/time" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => (
      <TextCell>{formatDateTime(row?.original?.createdOn, false)}</TextCell>
    ),
  },
  {
    accessorKey: 'metadata.createdByFullName',
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

const HospitalInitialHistoryTable = () => {
  const { setSelectedRow, hospitalInititalHistory } = useStore((state) => ({
    setSelectedRow: state.setSelectedRow,
    hospitalInititalHistory: state.hospitalInititalHistory,
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
      className="h-full w-full max-w-[220px] pr-2.5"
      scrollbars="vertical"
    >
      <Box className="outline-pp outline-pp-table-border h-full w-full outline outline-1 -outline-offset-1">
        <DataTable
          columns={columns}
          data={hospitalInititalHistory ?? []}
          onRowClick={onRowSelect}
          selectFirstRow={true}
          sticky
        />
      </Box>
    </ScrollArea>
  )
}

export { HospitalInitialHistoryTable }
