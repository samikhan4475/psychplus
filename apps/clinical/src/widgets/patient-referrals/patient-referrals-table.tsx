'use client'

import * as React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { type ColumnDef, type Table as ReactTable } from '@tanstack/react-table'
import { PatientReferral } from '@psychplus/types'
import {
  DataTable,
  DataTableColumnHeader,
  DataTableColumnVisibilitySelector,
  DataTableFacetedFilter,
  DataTablePageNavigation,
  DataTablePageSizeSelector,
  DataTableResetFilterButton,
} from '@psychplus/components/data-table'
import { TableCellLongText, TableCellText } from '@psychplus/ui/table-cell'
import { useStore } from './store'

const columns: ColumnDef<PatientReferral>[] = [
  {
    id: 'referral date',
    accessorKey: 'referralDateTime',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => <TableCellText text={row.original.referralDateTime} />,
    enableHiding: false,
  },
  {
    id: 'service',
    accessorKey: 'service',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Service" />
    ),
    cell: ({ row }) => <TableCellText text={row.original.service} />,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableHiding: true,
  },
  {
    id: 'service status',
    accessorKey: 'serviceStatus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Service Status" />
    ),
    cell: ({ row }) => <TableCellText text={row.original.serviceStatus} />,
    enableHiding: true,
  },
  {
    id: 'initiated by',
    accessorKey: 'initiatedBy',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Initiated By" />
    ),
    cell: ({ row }) => <TableCellText text={row.original.initiatedBy} />,
    enableHiding: true,
  },
  {
    id: 'referred by',
    accessorKey: 'referringProvider',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Referred By" />
    ),
    cell: ({ row }) => <TableCellText text={row.original.referringProvider} />,
    enableHiding: true,
  },
  {
    id: 'contact',
    accessorKey: 'contactStatus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact" />
    ),
    cell: ({ row }) => <TableCellText text={row.original.contactStatus} />,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableHiding: true,
  },
  {
    id: 'visit date',
    accessorKey: 'visitDateTime',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Visit Date" />
    ),
    cell: ({ row }) => <TableCellText text={row.original.visitDateTime} />,
    enableHiding: true,
  },
  {
    id: 'archive',
    accessorKey: 'archiveStatus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Archive" />
    ),
    cell: ({ row }) => <TableCellText text={row.original.archiveStatus} />,
    enableHiding: true,
  },
  {
    id: 'comments',
    accessorKey: 'comments',
    header: () => <Text>Comments</Text>,
    cell: ({ row }) => <TableCellLongText text={row.original.comments} />,
    enableHiding: true,
  },
]

const DataTableHeader = (table: ReactTable<PatientReferral>) => {
  const services = Array.from(
    new Set(
      table
        .getPreFilteredRowModel()
        .rows.flatMap((row) => row.original.service),
    ),
  )

  return (
    <Flex align="center" justify="between" py="3">
      <Flex align="center" gap="4">
        {table.getColumn('service') && (
          <DataTableFacetedFilter
            column={table.getColumn('service')}
            title="Service"
            placeholder="Search services"
            options={services.map((service) => ({
              label: service,
              value: service,
            }))}
          />
        )}
        <DataTableResetFilterButton table={table} />
      </Flex>
      <DataTableColumnVisibilitySelector table={table} />
    </Flex>
  )
}

const DataTableFooter = (table: ReactTable<PatientReferral>) => (
  <Flex py="3" align="center" justify="end">
    <Flex gap="3">
      <DataTablePageSizeSelector table={table} />
      <DataTablePageNavigation table={table} />
    </Flex>
  </Flex>
)

const PatientReferralsTable = () => {
  const referrals = useStore().getReferrals()

  return (
    <DataTable
      data={referrals}
      columns={columns}
      renderHeader={DataTableHeader}
      renderFooter={DataTableFooter}
    />
  )
}

export default PatientReferralsTable
