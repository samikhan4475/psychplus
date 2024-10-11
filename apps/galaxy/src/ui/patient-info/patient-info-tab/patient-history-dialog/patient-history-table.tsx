'use client'

import { Box, ScrollArea } from '@radix-ui/themes'
import { ColumnDef, Row, Table } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { PatientProfile } from '@/types'
import { formatDateTime } from '@/utils'
import { useStore } from './store'

const columns: ColumnDef<PatientProfile>[] = [
  {
    accessorKey: 'metadata.createdOn',
    header: ({ column }) => (
      <ColumnHeader label="Date/time" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => (
      <TextCell>
        {formatDateTime(row?.original?.metadata?.createdOn, false)}
      </TextCell>
    ),
  },
  {
    accessorKey: 'metadata.createdByFullName',
    header: ({ column }) => (
      <ColumnHeader sortable clientSideSort column={column} label="Username" />
    ),
    cell: ({ row }) => (
      <TextCell className="truncate">
        {row?.original?.metadata?.createdByFullName ?? 'N/A'}
      </TextCell>
    ),
  },
]

const PatientHistoryTable = () => {
  const { setSelectedRow, patientInfoHistory } = useStore((state) => ({
    setSelectedRow: state.setSelectedRow,
    patientInfoHistory: state.patientInfoHistory,
  }))

  const onRowSelect = (
    row: Row<PatientProfile>,
    table: Table<PatientProfile>,
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
          data={patientInfoHistory ?? []}
          onRowClick={onRowSelect}
          selectFirstRow={true}
          sticky
        />
      </Box>
    </ScrollArea>
  )
}

export { PatientHistoryTable }
