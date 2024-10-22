'use client'

import { Box, ScrollArea } from '@radix-ui/themes'
import { ColumnDef, Row, Table } from '@tanstack/react-table'
import { ColumnHeader, DataTable, LongTextCell, TextCell } from '@/components'
import { PatientProfile } from '@/types'
import { formatDateTime, getPatientFullName } from '@/utils'
import { useStore } from './store'

const columns: ColumnDef<PatientProfile>[] = [
  {
    accessorKey: 'metadata.createdOn',
    header: ({ column }) => (
      <ColumnHeader label="Date/time" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => (
      <TextCell className="truncate">
        {formatDateTime(row?.original?.metadata?.createdOn, false)}
      </TextCell>
    ),
  },
  {
    accessorKey: 'legalName.firstName',
    header: ({ column }) => (
      <ColumnHeader sortable clientSideSort column={column} label="Username" />
    ),
    cell: ({ row }) => (
      <LongTextCell className="min-w-24">
        {getPatientFullName(row?.original?.legalName) ?? 'N/A'}
      </LongTextCell>
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
      <Box className="outline-pp-gray-2 h-full w-full rounded-1 outline outline-1 -outline-offset-1">
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
