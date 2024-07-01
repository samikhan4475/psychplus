import { Box, Flex, Heading, Text } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import { PreferredPartner } from '@psychplus/patient/types'
import { DataTable } from '@psychplus/ui/data-table'
import { TableCellDateTime, TableCellText } from '@psychplus/ui/table-cell'
import { TableCellSelector } from './table-cell-selector'

const columns: ColumnDef<PreferredPartner>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: () => <Text className="font-[400]">PP ID</Text>,
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.id} />
    ),
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: () => <Text className="font-[400]">PP name</Text>,
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.name} />
    ),
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: () => <Text className="font-[400]">PP Premium Status</Text>,
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.status} />
    ),
  },
  {
    id: 'payer-status',
    accessorKey: 'payerStatus',
    header: () => <Text className="font-[400]">PP Payer Status</Text>,
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.payerStatus} />
    ),
  },
  {
    id: 'userId',
    accessorKey: 'userId',
    header: () => <Text className="font-[400]">PP User ID</Text>,
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.userId} />
    ),
  },
  {
    id: 'userType',
    accessorKey: 'userType',
    header: () => <Text className="font-[400]">PP User Type</Text>,
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.userType} />
    ),
  },
  {
    id: 'users-number',
    accessorKey: 'numberOfUsers',
    header: () => <Text className="font-[400]">Users in ID</Text>,
    cell: ({ row }) => (
      <TableCellText
        className="text-[12px]"
        text={row.original.numberOfUsers}
      />
    ),
  },
  {
    id: 'userStatus',
    accessorKey: 'userStatus',
    header: () => <Text className="font-[400]">Users in ID</Text>,
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.userStatus} />
    ),
  },
  // Insert date columns
  {
    id: 'startDate',
    accessorKey: 'startDate',
    header: () => <Text className="font-[400]">Start Date</Text>,
    cell: ({ row }) => <TableCellDateTime date={row.original.startDate} />,
  },
  {
    id: 'termDate',
    accessorKey: 'termDate',
    header: () => <Text className="font-[400]">Term Date</Text>,
    cell: ({ row }) => <TableCellDateTime date={row.original.termDate} />,
  },
  {
    id: 'priority',
    accessorKey: 'priority',
    header: () => <Text className="font-[400]">Priority</Text>,
    cell: ({ row }) => <TableCellSelector row={row} name="priority" />,
  },
]

const data = [
  {
    id: '123',
    name: '123',
    status: 'test@test.com',
    payerStatus: 'test',
    userId: 'test',
    userType: 'test',
    numberOfUsers: '10',
    userStatus: 'test',
    priority: 'Primary',
    startDate: '',
    termDate: '',
  },
  {
    id: '123',
    name: '123',
    status: 'test@test.com',
    payerStatus: 'test',
    userId: 'test',
    userType: 'test',
    numberOfUsers: '10',
    userStatus: 'test',
    priority: 'Primary',
    startDate: '',
    termDate: '',
  },
  {
    id: '123',
    name: '123',
    status: 'test@test.com',
    payerStatus: 'test',
    userId: 'test',
    userType: 'test',
    numberOfUsers: '10',
    userStatus: 'test',
    priority: 'Primary',
    startDate: '',
    termDate: '',
  },
  {
    id: '123',
    name: '123',
    status: 'test@test.com',
    payerStatus: 'test',
    userId: 'test',
    userType: 'test',
    numberOfUsers: '10',
    userStatus: 'test',
    priority: 'Primary',
    startDate: '',
    termDate: '',
  },
]

const PreferredPartnerTable = () => {
  return (
    <Flex direction="column">
      <Heading className="pt-[4px] pb-[2px] pl-2 text-[14px]">
        Preferred Partner
      </Heading>
      <Box className="bg-[#FFFF] px-2 pb-5 pt-1">
        <DataTable
          tHeadClass="bg-[#F0F4FF]"
          thClass="[box-shadow:inset_0_0_0_0.2px_#0134DB72] pl-1"
          tableClass="shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
          columnCellClass="[box-shadow:inset_0_0_0_0.1px_#0134DB72] pl-1"
          data={data}
          columns={columns}
        />
      </Box>
    </Flex>
  )
}

export { PreferredPartnerTable }
