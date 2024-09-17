'use client'

import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { ActionsCell, CollapseCell } from './cells'
import { FilterForm } from './filter-form'
import { useStore } from './store'
import { PaymentHistory } from './types'

const columns: ColumnDef<PaymentHistory>[] = [
  {
    id: 'hx',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Hx"
        className="px-1 py-0.5 !text-1 "
      />
    ),
    cell: ({ row }) => <CollapseCell row={row} />,
  },
  {
    id: 'dateTime',
    accessorKey: 'dateTime',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        label="Date/Time"
        className="px-1 py-0.5 !text-1 "
      />
    ),
    cell: ({ row }) => (
      <Flex>
        <TextCell className="!text-1">{row.original.date}</TextCell>
        <TextCell className="!text-1">{row.original.time}</TextCell>
      </Flex>
    ),
  },
  {
    id: 'charge',
    accessorKey: 'charge',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        label="Charge"
        className="px-1 py-0.5 !text-1 "
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 py-0.5 !text-1">{row.original.charge}</TextCell>
    ),
  },
  {
    id: 'visit',
    accessorKey: 'visit',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        label="Visit #"
        className="flex-grow px-1 py-0.5 !text-1"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 py-0.5 !text-1">{row.original.visit}</TextCell>
    ),
  },
  {
    id: 'method',
    accessorKey: 'method',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        label="Method"
        className="px-1 py-0.5 !text-1 "
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 py-0.5 !text-1">{row.original.method}</TextCell>
    ),
  },
  {
    id: 'paymentDescription',
    accessorKey: 'paymentDescription',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        label="Payment Description"
        className="px-1 py-0.5 !text-1"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 py-0.5 !text-1">
        {row.original.paymentDescription}
      </TextCell>
    ),
  },
  {
    id: 'description',
    accessorKey: 'description',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        label="Description"
        className="px-1 py-0.5 !text-1 "
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 py-0.5 !text-1">
        {row.original.description}
      </TextCell>
    ),
  },
  {
    id: 'coPay',
    accessorKey: 'coPay',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Co-Pay"
        className="px-1 py-0.5 !text-1 "
      />
    ),
    columns: [
      {
        accessorKey: 'coPay.due',
        header: ({ column }) => (
          <ColumnHeader label="Due" className="!text-black" column={column} />
        ),
        cell: ({ row }) => <TextCell>{row.original.coPay.due}</TextCell>,
      },
      {
        accessorKey: 'coPay.paid',
        header: ({ column }) => (
          <ColumnHeader
            label="Paid"
            column={column}
            className="!text-black p-1 "
          />
        ),
        cell: ({ row }) => <TextCell>{row.original.coPay.paid}</TextCell>,
      },
    ],
  },
  {
    id: 'coIns',
    accessorKey: 'coIns',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Co-Ins"
        className="px-1 py-0.5 !text-1 "
      />
    ),
    columns: [
      {
        accessorKey: 'coIns.due',
        header: ({ column }) => (
          <ColumnHeader label="Due" className="!text-black" column={column} />
        ),
        cell: ({ row }) => <TextCell>{row.original.coIns.due}</TextCell>,
      },
      {
        accessorKey: 'coIns.paid',
        header: ({ column }) => (
          <ColumnHeader
            label="Paid"
            column={column}
            className="!text-black p-1 "
          />
        ),
        cell: ({ row }) => <TextCell>{row.original.coIns.paid}</TextCell>,
      },
    ],
  },
  {
    id: 'transaction',
    accessorKey: 'transaction',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        label="Transaction #"
        className="px-1 py-0.5 !text-1 "
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 py-0.5 !text-1">
        {row.original.transaction}
      </TextCell>
    ),
  },
  {
    id: 'stripe',
    accessorKey: 'stripe',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        label="Stripe #"
        className="px-1 py-0.5 !text-1 "
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 py-0.5 !text-1">{row.original.stripe}</TextCell>
    ),
  },
  {
    id: 'updatedBy',
    accessorKey: 'updatedBy',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        label="Updated By"
        className="px-1 py-0.5 !text-1 "
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 py-0.5 !text-1">
        {row.original.updatedBy}
      </TextCell>
    ),
  },
  {
    id: 'updatedDate',
    accessorKey: 'updatedDate',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        label="Updated Date"
        className="px-1 py-0.5 !text-1 "
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 py-0.5 !text-1">
        {row.original.updatedDate}
      </TextCell>
    ),
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Actions"
        className="px-1 py-0.5 !text-1 "
      />
    ),
    cell: ActionsCell,
  },
]

const PaymentHistoryTable = () => {
  const { data } = useStore((state) => ({
    data: state.data,
  }))
  return (
    <Flex direction="column" gap="1" className="bg-white w-full px-2 py-1">
      <FilterForm />
      <ScrollArea className="max-w-[calc(100vw_-_210px)]">
        <Box className="min-w-max">
          <DataTable
            columns={columns}
            data={data?.paymentHistories ?? []}
            isRowSpan
          />
        </Box>
      </ScrollArea>
    </Flex>
  )
}
export { PaymentHistoryTable }
