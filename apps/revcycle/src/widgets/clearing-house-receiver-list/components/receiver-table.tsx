'use client'

import { Flex } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  DataTable,
  DataTableColumnHeader,
  DataTablePageNavigation,
  DataTablePaginationLabel,
} from '@psychplus/ui/data-table'
import { TableCellText } from '@psychplus/ui/table-cell'
import { useStore } from '../store'
import { ClearingHouseReceiver } from '../types'
import { RowActionDropdown } from './data-table-row.action'
import { FilterForm } from './filter-form'
import { TableCellLongText } from './table-cell-long-text'

const columns: ColumnDef<ClearingHouseReceiver>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText text={row.original.clearingHouseName} />
    ),
    enableHiding: true,
  },
  {
    id: 'address 1',
    accessorKey: 'address1',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Address 1"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.address1} />,
    enableHiding: true,
  },
  {
    id: 'address 2',
    accessorKey: 'address2',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Address 2"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.address2} />,
    enableHiding: true,
  },

  {
    id: 'city',
    accessorKey: 'city',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="City"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.city} />,
    enableHiding: true,
  },

  {
    id: 'state',
    accessorKey: 'state',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="State"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.state} />,
    enableHiding: true,
  },
  {
    id: 'zip',
    accessorKey: 'zip',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Zip"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.zip} />,
    enableHiding: true,
  },
  {
    id: 'phone',
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Phone"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.phone} />,
    enableHiding: true,
  },
  {
    id: 'fax',
    accessorKey: 'fax',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Fax"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.fax} />,
    enableHiding: false,
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Email"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.email} />,
    enableHiding: false,
  },
  {
    id: 'website',
    accessorKey: 'website',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Website"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.website} />,
    enableHiding: true,
  },
  {
    id: 'submission_method',
    accessorKey: 'submission_method',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Submission Method"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText text={row.original.submissionMethod} />
    ),
    enableHiding: true,
  },
  {
    id: 'rec_name',
    accessorKey: 'rec_name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Rec. Name"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellLongText text={row.original.receiverName} />,
    enableHiding: true,
  },
  {
    id: 'rec_id',
    accessorKey: 'rec_id',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Rec. ID"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellLongText text={row.original.receiverId} />,
    enableHiding: true,
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    enableHiding: false,
    cell: ({ row }) => <RowActionDropdown data={row.original} />,
  },
]

const DataTableFooter = (table: any) => (
  <Flex gap="3" align="center" justify="end">
    <DataTablePaginationLabel table={table} />
    <DataTablePageNavigation table={table} />
  </Flex>
)

const ReceiverTable = () => {
  const data = useStore((state) => state.clearingHouseReceivers)
  return (
    <>
      <FilterForm />
      <DataTable
        data={data}
        columns={columns}
        tableClass="border border-solid border-[lightgray] "
        tHeadClass="bg-[#EBF3FC]"
        thClass="border-b border-r border-solid border-[#C1E2FF] text-center"
        isRowPan={true}
        toBodyClass="border-[lightgray]; border-b border-solid"
        columnCellClass="border border-solid border-[#F2F2F2] w-50"
        renderFooter={DataTableFooter}
      />
    </>
  )
}

export { ReceiverTable }
