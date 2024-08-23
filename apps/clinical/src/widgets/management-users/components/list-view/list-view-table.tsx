import { Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@psychplus/ui/data-table/data-table'
import { DataTableColumnHeader } from '@psychplus/ui/data-table/data-table-column-header'
import { TableCellDateTime, TableCellText } from '@psychplus/ui/table-cell'
import { TableData } from '../../types'
import { RowActionDropdown } from './row-action-dropdown'

const data = [
  {
    id: 213,
    firstName: 'Chandler',
    middleName: 'Bing',
    lastName: 'Smith',
    userType: 'Patient',
    organization: 'PsychPlus',
    practice: 'Psychiatry',
    status: 'Active',
    dob: '03/21/96',
    gender: 'Male',
    language: 'English',
    email: 'abc@gmail.com',
    phone: '1234567890',
    homeAddress: 'Houston',
  },
]

const columns: ColumnDef<TableData>[] = [
  {
    id: 'first-name',
    accessorKey: 'firstName',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="First Name"
        className="font-regular text-[#1C2024]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.firstName} />,
  },
  {
    id: 'middle-name',
    accessorKey: 'middleName',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Middle Name"
        className="font-regular text-[#1C2024]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.middleName} />,
  },
  {
    id: 'last-name',
    accessorKey: 'lastName',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Last Name"
        className="font-regular text-[#1C2024]"
      />
    ),
    cell: ({ row }) => <TableCellText text={`${row.original.lastName}`} />,
  },
  {
    id: 'user-type',
    accessorKey: 'userType',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="User Type"
        className="font-regular text-[#1C2024]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.userType} />,
  },
  {
    id: 'organization',
    accessorKey: 'organization',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Organization"
        className="font-regular text-[#1C2024]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.organization} />,
  },
  {
    id: 'practice',
    accessorKey: 'practice',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Practice"
        className="font-regular text-[#1C2024]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.practice} />,
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
        className="font-regular text-[#1C2024]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.status} />,
  },
  {
    id: 'dob',
    accessorKey: 'dob',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="DOB"
        className="font-regular text-[#1C2024]"
      />
    ),
    cell: ({ row }) => <TableCellDateTime date={row.original.dob} />,
  },
  {
    id: 'gen',
    accessorKey: 'gen',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Gender"
        className="font-regular text-[#1C2024]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.gender} />,
  },
  {
    id: 'language',
    accessorKey: 'language',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Language"
        className="font-regular text-[#1C2024]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.language} />,
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Email"
        className="font-regular text-[#1C2024]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.email} />,
  },
  {
    id: 'phone',
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Phone"
        className="font-regular text-[#1C2024]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.phone} />,
  },
  {
    id: 'homeAddress',
    accessorKey: 'homeAddress',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Home Address"
        className="font-regular text-[#1C2024]"
      />
    ),
    cell: ({ row }) => <TableCellText text={row.original.homeAddress} />,
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Actions"
        className="font-regular text-[#1C2024]"
      />
    ),
    enableHiding: false,
    cell: ({ row }) => (
      <Flex justify="center">
        <RowActionDropdown data={row.original} />
      </Flex>
    ),
  },
]

const ListViewTable = () => {
  return (
    <DataTable
      tHeadClass="bg-[#F0F4FF] rounded-2xl"
      thClass="pl-1 border border-[#D9E2FC]"
      tableClass="px-1 border-collapse border-[#D9E2FC] border-radius-[10px]"
      columnCellClass="pl-1 border border-[#D9E2FC] [box-shadow:none] text-[#1C2024]"
      headerCellClass="rounded-2xl"
      data={[data[0], data[0], data[0], data[0], data[0], data[0], data[0]]}
      columns={columns}
    />
  )
}

export { ListViewTable }
