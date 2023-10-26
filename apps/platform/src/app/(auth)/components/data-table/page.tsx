'use client'

import * as React from 'react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Box, Flex, Text } from '@radix-ui/themes'
import { type ColumnDef, type Table as ReactTable } from '@tanstack/react-table'
import {
  createDataTableSelectColumn,
  DataTable,
  DataTableColumnHeader,
  DataTableColumnVisibilitySelector,
  DataTableFacetedFilter,
  DataTablePageNavigation,
  DataTablePageSizeSelector,
  DataTableResetFilterButton,
  DataTableSelectedRowLabel,
  DataTableTextFilter,
} from '@psychplus/components'
import { Button } from '@psychplus/ui/button'
import { DropdownMenu } from '@psychplus/ui/dropdown-menu'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'Data Table'
const DESCRIPTION = 'Powerful table and datagrids built using TanStack Table.'

const data: Payment[] = [
  {
    id: 'm5gr84i9',
    amount: 316,
    status: 'success',
    email: 'oironcrusher79@example.com',
  },
  {
    id: '3u1reuv4',
    amount: 242,
    status: 'success',
    email: 'zrunejaw35@gmail.com',
  },
  {
    id: 'derv1ws0',
    amount: 837,
    status: 'processing',
    email: 'riceheart44@gmail.com',
  },
  {
    id: '5kma53ae',
    amount: 874,
    status: 'pending',
    email: 'smudfinger12@gmail.com',
  },
  {
    id: 'bhqecj4p',
    amount: 721,
    status: 'failed',
    email: 'caxefury22@psychplus.com',
  },
]

type Payment = {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

const columns: ColumnDef<Payment>[] = [
  createDataTableSelectColumn(),
  {
    id: 'status',
    accessorKey: 'status',
    header: () => <Text>Status</Text>,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('status')}</div>
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div>{row.getValue('email')}</div>,
    enableHiding: false,
  },
  {
    id: 'amount',
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Amount"
        className="text-right"
      />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end">
            <DropdownMenu.Label>Actions</DropdownMenu.Label>
            <DropdownMenu.Item
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>View customer</DropdownMenu.Item>
            <DropdownMenu.Item>View payment details</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )
    },
  },
]

const statuses = [
  {
    label: 'Success',
    value: 'success',
  },
  {
    label: 'Pending',
    value: 'pending',
  },
  {
    label: 'Processing',
    value: 'processing',
  },
  {
    label: 'Failed',
    value: 'failed',
  },
]

const DataTableHeader = (table: ReactTable<Payment>) => {
  return (
    <Flex align="center" justify="between" py="3">
      <Flex align="center" gap="4">
        <DataTableTextFilter
          placeholder="Filter emails..."
          column={table.getColumn('email')}
        />
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={statuses}
          />
        )}
        <DataTableResetFilterButton table={table} />
      </Flex>

      <DataTableColumnVisibilitySelector table={table} />
    </Flex>
  )
}

const DataTableFooter = (table: ReactTable<Payment>) => (
  <Flex py="3" align="center" justify="between">
    <DataTableSelectedRowLabel table={table} />
    <Flex gap="3">
      <DataTablePageSizeSelector table={table} />
      <DataTablePageNavigation table={table} />
    </Flex>
  </Flex>
)

const DataTableComponentPage = () => (
  <Box className="min-w-[800px]">
    <PageHeader title={TITLE} description={DESCRIPTION} />

    <Box mb="7">
      <DataTable
        data={data}
        columns={columns}
        renderHeader={DataTableHeader}
        renderFooter={DataTableFooter}
      />
    </Box>
  </Box>
)

export default DataTableComponentPage
