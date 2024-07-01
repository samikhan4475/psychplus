import { Box, Flex, Heading, Text } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import { Button } from '@psychplus/ui/button'
import {
  DataTable,
  DataTableRowActions,
  RowAction,
} from '@psychplus/ui/data-table'
import { TableCellText } from '@psychplus/ui/table-cell'
import { RepeatIcon } from '@/components/icons'
import { LinkAccount } from '../types'
import { RowActionDetails } from './row-action-details'
import { RowActionEdit } from './row-action-edit'
import { TableCellSelector } from './table-cell-selector'

const rowActions: RowAction<LinkAccount>[] = [
  {
    id: 'patient-referrals-row-action-details',
    render: RowActionDetails,
  },
  {
    id: 'patient-referrals-row-action-edit',
    render: RowActionEdit,
  },
]

const columns: ColumnDef<LinkAccount>[] = [
  {
    id: 'mrn',
    accessorKey: 'mrn',
    header: () => <Text className="font-[400]">MRN</Text>,
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.mrn} />
    ),
  },
  {
    id: 'phone',
    accessorKey: 'phone',
    header: () => <Text className="font-[400]">Phone</Text>,
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.phone} />
    ),
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: () => <Text className="font-[400]">Email</Text>,
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.email} />
    ),
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: () => <Text className="font-[400]">Status</Text>,
    cell: ({ row }) => <TableCellSelector row={row} name="status" />,
  },
  {
    id: 'signin',
    accessorKey: 'signIn',
    header: () => <Text className="font-[400]">Sign In</Text>,
    cell: ({ row }) => <TableCellSelector row={row} name="signIn" />,
  },
  {
    id: 'schedule',
    accessorKey: 'schedule',
    header: () => <Text className="font-[400]">Schedule/Messaging/Orders</Text>,
    cell: ({ row }) => <TableCellSelector row={row} name="schedule" />,
  },
  {
    id: 'priority',
    accessorKey: 'priority',
    header: () => <Text className="font-[400]">Priority</Text>,
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.priority} />
    ),
  },
  {
    id: 'action',
    accessorKey: 'action',
    header: () => <Text className="font-[400]">Action</Text>,
    cell: ({ row }) => (
      <Flex className="w-[32px] bg-[#EBF3FC]" justify="center" align="center">
        <DataTableRowActions row={row} actions={rowActions} />
      </Flex>
    ),
  },
]

const data = [
  {
    mrn: '123',
    phone: '123',
    email: 'test@test.com',
    status: 'test',
    signIn: 'test',
    schedule: 'test',
    priority: 'test',
  },
  {
    mrn: '123',
    phone: '123',
    email: 'test@test.com',
    status: 'test',
    signIn: 'test',
    schedule: 'test',
    priority: 'test',
  },
  {
    mrn: '123',
    phone: '123',
    email: 'test@test.com',
    status: 'test',
    signIn: 'test',
    schedule: 'test',
    priority: 'test',
  },
  {
    mrn: '123',
    phone: '123',
    email: 'test@test.com',
    status: 'test',
    signIn: 'test',
    schedule: 'test',
    priority: 'test',
  },
]

const LinkAccountTable = () => {

  return (
    <Flex direction="column">
      <Flex justify="between" align="center" className="px-2 pb-1 pt-2">
        <Heading className='text-[14px]'>Link Account</Heading>
        <Button
          variant="outline"
          className="h-6 cursor-pointer bg-[#FFF] px-2 text-[12px] text-[#000000] [box-shadow:inset_0_0_0_0.4px_#9E9898CC]"
        >
          <RepeatIcon width={16} height={16} />
          Link Account
        </Button>
      </Flex>
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

export { LinkAccountTable }
