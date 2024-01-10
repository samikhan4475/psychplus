'use client'

import { useSearchParams } from 'next/navigation'
import { Flex, Text } from '@radix-ui/themes'
import { type ColumnDef, type Table } from '@tanstack/react-table'
import { type Referral } from '@psychplus/referrals'
import {
  DataTable,
  DataTableColumnHeader,
  DataTableFacetedFilter,
  DataTablePageNavigation,
  DataTablePaginationLabel,
  DataTableResetFilterButton,
  DataTableRowActions,
  type RowAction,
} from '@psychplus/ui/data-table'
import {
  TableCellCode,
  TableCellDateTime,
  TableCellLongText,
  TableCellText,
} from '@psychplus/ui/table-cell'
import {
  useContactStatusFilterOptions,
  useServiceLabel,
  useServiceOptions,
  useStatusLabel,
} from '../hooks'
import { useStore } from '../store'
import { AddReferralButton } from './add-referral-button'
import { RowActionDetails } from './row-action-details'
import { RowActionEdit } from './row-action-edit'
import { TableCellContact } from './table-cell-contact'
import { TableCellStatus } from './table-cell-status'

const rowActions: RowAction<Referral>[] = [
  {
    id: 'patient-referrals-row-action-details',
    render: RowActionDetails,
  },
  {
    id: 'patient-referrals-row-action-edit',
    render: RowActionEdit,
  },
]

const columns: ColumnDef<Referral>[] = [
  {
    id: 'referral date',
    accessorKey: 'referralDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => (
      <TableCellDateTime date={row.original.metadata.createdOn} />
    ),
    enableHiding: false,
  },
  {
    id: 'service',
    accessorKey: 'service',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Service" />
    ),
    cell: ({ row }) => (
      <TableCellCode value={row.original.service} getLabel={useServiceLabel} />
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableHiding: true,
  },
  {
    id: 'service status',
    accessorKey: 'servicesStatus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Service Status" />
    ),
    cell: ({ row }) => (
      <TableCellCode
        value={row.original.servicesStatus}
        getLabel={useStatusLabel}
      />
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableHiding: true,
  },
  {
    id: 'created by',
    accessorKey: 'metadata.createdByFullName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Initiated By" />
    ),
    cell: ({ row }) => (
      <TableCellText text={row.original.metadata.createdByFullName} />
    ),
    enableHiding: true,
  },
  {
    id: 'referring provider',
    accessorKey: 'referringProvider',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Referring Provider" />
    ),
    cell: ({ row }) => (
      <TableCellText
        text={
          row.original.referredByName
            ? `${row.original.referredByName.firstName} ${row.original.referredByName.lastName}`
            : undefined
        }
      />
    ),
    enableHiding: true,
  },
  {
    id: 'contact status',
    accessorKey: 'contactStatus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact" />
    ),
    cell: ({ row }) => <TableCellContact row={row} />,
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
    id: 'referral status',
    accessorKey: 'resourceStatus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Referral Status" />
    ),
    cell: ({ row }) => <TableCellStatus row={row} />,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableHiding: true,
  },
  {
    id: 'comments',
    accessorKey: 'comments',
    header: () => <Text size="1">Comments</Text>,
    cell: ({ row }) => <TableCellLongText text={row.original.comments} />,
    enableHiding: true,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <DataTableRowActions row={row} actions={rowActions} />,
  },
]

const DataTableHeader = (table: Table<Referral>) => {
  const params = useSearchParams()
  const showFilters = params.get('hideFilters') !== 'true'

  const services = new Set(
    table.getPreFilteredRowModel().rows.flatMap((row) => row.original.service),
  )

  const contactStatuses = new Set(
    table
      .getPreFilteredRowModel()
      .rows.flatMap((row) => row.original.contactStatus),
  )

  const referralStatuses = Array.from(
    new Set(
      table
        .getPreFilteredRowModel()
        .rows.flatMap((row) => row.original.resourceStatus),
    ),
  )

  const serviceOptions = useServiceOptions().filter((option) =>
    services.has(option.value),
  )

  const contactStatusOptions = useContactStatusFilterOptions().filter(
    (option) => contactStatuses.has(option.value),
  )

  return (
    <Flex align="center" justify="between" p="1" mb="1">
      {showFilters ? (
        <Flex align="center" gap="4">
          <Flex align="center" gap="2">
            {table.getColumn('service') && (
              <DataTableFacetedFilter
                column={table.getColumn('service')}
                title="Service"
                placeholder="Search"
                options={serviceOptions}
              />
            )}
            {table.getColumn('service status') && (
              <DataTableFacetedFilter
                column={table.getColumn('service status')}
                title="Type"
                search={false}
                options={['Routine', 'Emergency'].map((status) => ({
                  label: status,
                  value: status,
                }))}
              />
            )}
            {table.getColumn('contact status') && (
              <DataTableFacetedFilter
                column={table.getColumn('contact status')}
                title="Contact"
                search={false}
                options={contactStatusOptions}
              />
            )}
            {table.getColumn('referral status') && (
              <DataTableFacetedFilter
                column={table.getColumn('referral status')}
                title="Status"
                search={false}
                options={referralStatuses.map((status) => ({
                  label: status,
                  value: status,
                }))}
              />
            )}
          </Flex>
          <DataTableResetFilterButton table={table} />
        </Flex>
      ) : (
        <div></div>
      )}
      <AddReferralButton />
    </Flex>
  )
}

const DataTableFooter = (table: Table<Referral>) => (
  <Flex py="1" align="center" justify="end">
    <Flex gap="3" align="center">
      <DataTablePaginationLabel table={table} />
      <DataTablePageNavigation table={table} />
    </Flex>
  </Flex>
)

const PatientReferralsTable = () => {
  const params = useSearchParams()
  const includeInactive = params.get('includeInactive') === 'true'

  const data = useStore((state) =>
    state.referrals.filter((referral) => {
      if (!includeInactive && referral.resourceStatus === 'Deleted') {
        return false
      }
      return true
    }),
  )

  return (
    <DataTable
      data={data}
      columns={columns}
      renderHeader={DataTableHeader}
      renderFooter={DataTableFooter}
      initialPageSize={10}
    />
  )
}

export { PatientReferralsTable }
