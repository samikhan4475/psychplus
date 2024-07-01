'use client'

import { Flex } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  DataTable,
  DataTableColumnHeader,
  DataTablePageNavigation,
  DataTablePaginationLabel,
} from '@psychplus/ui/data-table'
import { TableCellDateTime, TableCellText } from '@psychplus/ui/table-cell'
import { useStore } from '../store'
import { RowActionDropdown } from './data-table-row.action'
import { FilterForm } from './filter-form'
import { TableCellLongText } from './table-cell-long-text'

const columns: ColumnDef<any>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    size: 10,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="PP ID"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText text={row.original.id} row={row.original} />
    ),
    enableHiding: true,
  },
  {
    id: 'name',
    accessorKey: 'name',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="PP Name"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText text={row.original.name} row={row.original} />
    ),
    enableHiding: true,
  },
  {
    id: 'total users',
    accessorKey: 'totalUser',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total Users"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.totalUser} />,
    enableHiding: true,
  },
  {
    id: 'total ids',
    accessorKey: 'totalIds',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total Ids"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.totalIds} />,
    enableHiding: true,
  },

  {
    id: 'payer status',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="PP Payer Status"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.payerStatus} />,
    enableHiding: true,
  },
  {
    id: 'Individual',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Individual"
        className="text-[#000]"
      />
    ),
    columns: [
      {
        id: 'individual #',
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="#"
            className="text-[#000]"
          />
        ),
        cell: ({ row }) => (
          <TableCellText text={row.original.individualsCount} />
        ),
        enableHiding: true,
      },
      {
        id: 'individual rate',

        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="Rate"
            className="text-[#000]"
          />
        ),
        cell: ({ row }) => <TableCellText text={row.original.individualRate} />,
        enableHiding: true,
      },
    ],
  },

  {
    id: 'Couple',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Couple"
        className="text-[#000]"
      />
    ),
    columns: [
      {
        id: 'couple #',
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="#"
            className="text-[#000]"
          />
        ),
        cell: ({ row }) => <TableCellText text={row.original.couplesCount} />,
        enableHiding: true,
      },
      {
        id: 'couple rate',

        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="Rate"
            className="text-[#000]"
          />
        ),
        cell: ({ row }) => <TableCellText text={row.original.coupleRate} />,
        enableHiding: true,
      },
    ],
  },

  {
    id: 'Family',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Family"
        className="text-[#000]"
      />
    ),
    columns: [
      {
        id: 'family #',
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="#"
            className="text-[#000]"
          />
        ),
        cell: ({ row }) => <TableCellText text={row.original.familiesCount} />,
        enableHiding: true,
      },
      {
        id: 'family rate',

        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="Rate"
            className="text-[#000]"
          />
        ),
        cell: ({ row }) => <TableCellText text={row.original.familyRate} />,
        enableHiding: true,
      },
    ],
  },

  {
    id: 'charge plus',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total Charge Plus"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.plusChargeAmount} />,
    enableHiding: true,
  },
  {
    id: 'charge service',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total Charge Service"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellText text={row.original.serviceChargeAmount} />
    ),
    enableHiding: true,
  },
  {
    id: 'billing frequency',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Billing Frequency"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.billingFrequency} />,
    enableHiding: true,
  },
  {
    id: 'start date',
    accessorKey: 'startDate',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Start Date"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellDateTime date={row.original.startDate} />,
    enableHiding: false,
  },
  {
    id: 'next payment',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Next Payment"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellDateTime date={row.original.nextPaymentDate} />
    ),
    enableHiding: false,
  },
  {
    id: 'payment status',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Payment Status"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.paymentStatus} />,
    enableHiding: true,
  },
  {
    id: 'address',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Address"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        text={`${row.original.contactDetails?.addresses[0]?.street1} ${row?.original?.contactDetails?.addresses[0]?.street2}`}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    enableHiding: false,
    cell: ({ row }) => <RowActionDropdown data={row} />,
  },
]

const DataTableFooter = (table: any) => (
  <Flex py="1" align="center" justify="end">
    <Flex gap="3" align="center">
      <DataTablePaginationLabel table={table} />
      <DataTablePageNavigation table={table} />
    </Flex>
  </Flex>
)

const PreferredPartnersTable = () => {
  const data = useStore((state) => state.preferredPartners)
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
        isPreferredPartnerTable={true}
        renderFooter={DataTableFooter}
      />
    </>
  )
}

export { PreferredPartnersTable }
