'use client'

import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef, Row, Table } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { RawInsurance } from '@/types'
import { formatDateTime } from '@/utils'
import { useStore } from './store'

const columns: ColumnDef<RawInsurance>[] = [
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

const HistoryTable = () => {
  const { setSelectedRow, insuranceHistory } = useStore((state) => ({
    setSelectedRow: state.setSelectedRow,
    insuranceHistory: state.insuranceHistory,
  }))

  const onRowSelect = (row: Row<RawInsurance>, table: Table<RawInsurance>) => {
    table.setRowSelection({ [row.id]: true })
    setSelectedRow(row.original)
  }

  return (
    <ScrollArea
      className="outline-pp outline-pp-table-border h-full w-full max-w-[220px] outline outline-1 -outline-offset-1"
      scrollbars="vertical"
    >
      <DataTable
        columns={columns}
        data={insuranceHistory ?? []}
        onRowClick={onRowSelect}
        selectFirstRow={true}
        sticky
      />
    </ScrollArea>
  )
}

export { HistoryTable }
