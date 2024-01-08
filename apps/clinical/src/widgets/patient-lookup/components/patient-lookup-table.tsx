'use client'

import { Flex } from '@radix-ui/themes'
import { type ColumnDef, type Table } from '@tanstack/react-table'
import {
  DataTable,
  DataTableColumnHeader,
  DataTableColumnVisibilitySelector,
  DataTablePageNavigation,
  DataTablePageSizeSelector,
  DataTableResetFilterButton,
} from '@psychplus/ui/data-table'
import { TableCellText } from '@psychplus/ui/table-cell'
import { useStore } from '../store'
import { type Patients } from '../types'

const columns: ColumnDef<Patients>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <TableCellText
        text={`${row.original.legalName.firstName} ${row.original.legalName.lastName}`}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <TableCellText text={row.original.contactDetails.email} />
    ),
  },
  {
    id: 'telephone',
    accessorKey: 'telephone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => {
      let numbersList = row.original.contactDetails.phoneNumbers
        ?.map((phone) => `, ${phone.number}`)
        ?.join()
      numbersList = numbersList.replace(',', '') || ''
      return <TableCellText text={numbersList} />
    },
  },
  {
    id: 'gender',
    accessorKey: 'gender',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: ({ row }) => <TableCellText text={row.original.gender} />,
    enableHiding: true,
  },

  {
    id: 'birthdate',
    accessorKey: 'birthdate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DOB" />
    ),
    cell: ({ row }) => <TableCellText text={row.original.birthdate} />,
    enableHiding: true,
  },

  {
    id: 'createdOn',
    accessorKey: 'createdOn',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created Date" />
    ),
    cell: ({ row }) => <TableCellText text={row.original.metadata.createdOn} />,
    enableHiding: false,
  },

  {
    id: 'createdByFullName',
    accessorKey: 'createdByFullName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created By" />
    ),
    cell: ({ row }) => (
      <TableCellText text={row.original.metadata.createdByFullName || 'user'} />
    ),
    enableHiding: false,
  },
]

const DataTableHeader = (table: Table<Patients>) => {
  return (
    <Flex align="center" justify="between" py="3">
      <Flex align="center" gap="4">
        <DataTableResetFilterButton table={table} />
      </Flex>
      <DataTableColumnVisibilitySelector table={table} />
    </Flex>
  )
}

const DataTableFooter = (table: Table<Patients>) => (
  <Flex py="3" align="center" justify="end">
    <Flex gap="3">
      <DataTablePageSizeSelector table={table} />
      <DataTablePageNavigation table={table} />
    </Flex>
  </Flex>
)

const PatientLookupTable = () => {
  const data = useStore((state) => state.getPatients())

  return (
    <DataTable
      data={data}
      columns={columns}
      renderHeader={DataTableHeader}
      renderFooter={DataTableFooter}
    />
  )
}

export { PatientLookupTable }
