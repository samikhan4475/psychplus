'use client'

import { Flex, ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { TableHeaderCheckboxCell, TableRowCheckboxCell } from './cells'
import { FilterForm } from './filter-form'
import { PatientPayment } from './types'

const columns: ColumnDef<PatientPayment>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <TableHeaderCheckboxCell
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={table.toggleAllPageRowsSelected}
      />
    ),
    cell: ({ row }) => (
      <TableRowCheckboxCell
        checked={row.getIsSelected()}
        onCheckedChange={row.toggleSelected}
      />
    ),
  },
  {
    accessorKey: 'method',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        label="Payment Method"
        className="px-0 !text-1 !font-medium"
      />
    ),
    cell: ({ row }) => <TextCell>{row?.original?.method}</TextCell>,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        label="Description"
        className="px-0 !text-1 !font-medium"
      />
    ),
    cell: ({ row }) => <TextCell>{row?.original?.description}</TextCell>,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        label="Payment Date"
        className="px-0 !text-1 !font-medium"
      />
    ),
    cell: ({ row }) => <TextCell>{row?.original?.date}</TextCell>,
  },
  {
    accessorKey: 'ammount',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        label="Ammount"
        className="px-0 !text-1 !font-medium"
      />
    ),
    cell: ({ row }) => <TextCell>{row?.original?.ammount}</TextCell>,
  },
]
const PaymentsTable = () => {
  return (
    <Flex gap="2" direction="column">
      <FilterForm />
      <ScrollArea className="max-h-32">
        <DataTable columns={columns} data={data} sticky theadClass="z-10" />
      </ScrollArea>
    </Flex>
  )
}

const data: PatientPayment[] = [...Array(5)].map(() => ({
  ammount: '',
  date: '',
  description: '',
  method: 'Credit Card',
}))
export { PaymentsTable }
