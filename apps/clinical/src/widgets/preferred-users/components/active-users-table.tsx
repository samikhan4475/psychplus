'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { TableCellLongText } from 'node_modules/@psychplus/ui/src/table-cell'
import { PreferredPartnerPatient } from '@psychplus/preferred-partners'
import { DataTable, DataTableColumnHeader } from '@psychplus/ui/data-table'
import { RowActionDropdown } from './data-table-row.action'

const columns: ColumnDef<any>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name"
        className="justify-content-between box-border w-full text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellLongText text={row.original.name} />,
    enableHiding: true,
  },

  {
    id: 'user status',
    accessorKey: 'userStatus',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="User Status"
        className="justify-content-between box-border w-full text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellLongText text={row.original.userStatus} />,
    enableHiding: true,
  },

  {
    id: 'gender',
    accessorKey: 'gender',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Gender"
        className="justify-content-between box-border w-full text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellLongText text={row.original.gender} />,
    enableHiding: true,
  },

  {
    id: 'dob',
    accessorKey: 'dob',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="DOB"
        className="justify-content-between box-border w-full text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellLongText text={row.original.dob} />,
    enableHiding: true,
  },

  {
    id: 'mrn',
    accessorKey: 'mrn',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="MRN"
        className="justify-content-between box-border w-full text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellLongText text={row.original.mrn} />,
    enableHiding: true,
  },

  {
    id: 'phone',
    accessorKey: 'contactDetails.phoneNumbers[0].number',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Phone"
        className="justify-content-between box-border w-full text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        text={row.original.contactDetails.phoneNumbers[0].number}
      />
    ),
    enableHiding: true,
  },

  {
    id: 'email',
    accessorKey: 'contactDetails.email',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Email"
        className="justify-content-between box-border w-full text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText text={row.original.contactDetails.email} />
    ),
    enableHiding: true,
  },

  {
    id: 'address',
    accessorKey: 'contactDetails.addresses[0].street1',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Address"
        className="justify-content-between box-border w-full text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        text={`${row.original.contactDetails.addresses[0].street1} ${row.original.contactDetails.addresses[0].street2}`}
      />
    ),
    enableHiding: true,
  },

  {
    id: 'PP User ID',
    accessorKey: 'PPUserID',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="PP User ID"
        className="justify-content-between box-border w-full text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellLongText text={row.original.pid} />,
    enableHiding: true,
  },

  {
    id: 'PP User Type',
    accessorKey: 'userType',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="PP User Type"
        className="justify-content-between box-border w-full text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellLongText text={row.original.userType} />,
    enableHiding: true,
  },

  {
    id: 'Users in ID',
    accessorKey: 'UsersInID',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Users in ID"
        className="justify-content-between box-border w-full text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellLongText text={row.original.name} />,
    enableHiding: true,
  },

  {
    id: 'PP User Status',
    accessorKey: 'PPUserStatus',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="PP User Status"
        className="justify-content-between box-border w-full text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellLongText text={row.original.name} />,
    enableHiding: true,
  },

  {
    id: 'Start Date',
    accessorKey: 'addDate',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Start Date"
        className="justify-content-between box-border w-full text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellLongText text={row.original.addDate} />,
    enableHiding: true,
  },

  {
    id: 'Term Date',
    accessorKey: 'termDate',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Term Date"
        className="justify-content-between box-border w-full text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellLongText text={row.original.termDate} />,
    enableHiding: true,
  },

  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    enableHiding: false,
    cell: ({ row }) => <RowActionDropdown data={row} actionOf={'active'} />,
  },
]
const ActiveUsersTable = ({ data }: { data: PreferredPartnerPatient[] }) => {
  return (
    <DataTable
      data={data}
      columns={columns}
      tableClass="border border-solid border-[lightgray] "
      tHeadClass="bg-[#EBF3FC]"
      thClass="border-b border-r border-solid border-[#C1E2FF] text-center"
      isRowPan={true}
      toBodyClass="border-[lightgray]; border-b border-solid"
      columnCellClass="border border-solid border-[#F2F2F2] w-50"
    />
  )
}

export { ActiveUsersTable }
