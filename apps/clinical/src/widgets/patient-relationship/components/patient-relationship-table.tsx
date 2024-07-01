import { Box, Flex, Heading, Switch, Text } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import { z } from 'zod'
import { Button } from '@psychplus/ui/button'
import {
  DataTable,
  DataTableRowActions,
  RowAction,
} from '@psychplus/ui/data-table'
import { TableCellText } from '@psychplus/ui/table-cell'
import { usePubsub } from '@psychplus/utils/event'
import { ADD_RELATIONSHIP_WIDGET } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'
import { type Guardians } from '../types'
import { RowActionDetails } from './row-action-details'
import { RowActionEdit } from './row-action-edit'
import { PlusIcon } from '@radix-ui/react-icons'

const rowActions: RowAction<Guardians>[] = [
  {
    id: 'patient-referrals-row-action-details',
    render: RowActionDetails,
  },
  {
    id: 'patient-referrals-row-action-edit',
    render: RowActionEdit,
  },
]

const columns: ColumnDef<Guardians>[] = [
  {
    id: 'first-name',
    accessorKey: 'firstName',
    header: () => <Text className="font-[400]">First Name</Text>,
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.firstName} />
    ),
  },
  {
    id: 'middle-name',
    accessorKey: 'middleName',
    header: () => <Text className="font-[400]">Middle Name</Text>,
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.middleName} />
    ),
  },
  {
    id: 'last-name',
    accessorKey: 'lastName',
    header: () => <Text className="font-[400]">Last Name</Text>,
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.lastName} />
    ),
  },
  {
    id: 'relationship',
    accessorKey: 'relationship',
    header: () => <Text className="font-[400]">Relationship</Text>,
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.relationship} />
    ),
  },
  {
    id: 'address1',
    accessorKey: 'address1',
    header: () => <Text className="font-[400]">Address 1</Text>,
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.address1} />
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
    id: 'home-phone',
    accessorKey: 'homePhone',
    header: () => <Text className="font-[400]">Home Phone</Text>,
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.homePhone} />
    ),
  },
  {
    id: 'Emergency Contact',
    accessorKey: 'emergencyContact',
    header: () => <Text className="font-[400]">Emergency Contact</Text>,
    cell: ({ row }) => (
      <Text>
        <Switch defaultChecked color="grass" /> Yes
      </Text>
    ),
  },
  {
    id: 'rri',
    accessorKey: 'rri',
    header: () => <Text className="font-[400]">RRI</Text>,
    cell: ({ row }) => (
      <Text>
        <Switch defaultChecked color="grass" /> Yes
      </Text>
    ),
  },
  {
    id: 'cell-phone',
    accessorKey: 'cellPhone',
    header: () => <Text className="font-[400]">Cell Phone</Text>,
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.cellPhone} />
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
    firstName: 'Test',
    middleName: 'Test',
    lastName: 'Test',
    relationship: 'test',
    address1: 'Street test, test, test',
    email: 'test@test.com',
    homePhone: '123',
    cellPhone: '123',
    emergencyContact: true,
    rri: true,
  },
  {
    firstName: 'Test',
    middleName: 'Test',
    lastName: 'Test',
    relationship: 'test',
    address1: 'Street test, test, test',
    email: 'test@test.com',
    homePhone: '123',
    cellPhone: '123',
    emergencyContact: true,
    rri: true,
  },
  {
    firstName: 'Test',
    middleName: 'Test',
    lastName: 'Test',
    relationship: 'test',
    address1: 'Street test, test, test',
    email: 'test@test.com',
    homePhone: '123',
    cellPhone: '123',
    emergencyContact: true,
    rri: true,
  },
  {
    firstName: 'Test',
    middleName: 'Test',
    lastName: 'Test',
    relationship: 'test',
    address1: 'Street test, test, test',
    email: 'test@test.com',
    homePhone: '123',
    cellPhone: '123',
    emergencyContact: true,
    rri: true,
  },
]

const schema = z.object({
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  relationship: z.string(),
  guardianAddress: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
})
type SchemaType = z.infer<typeof schema>

const RelationshipsTable = () => {
  const { publish } = usePubsub()

  return (
    <Flex direction="column">
      <Flex justify="between" className="px-2 pb-[2px] pt-[4px]" align="center">
        <Heading className='text-[14px]'>Relationship</Heading>
        <Button
          variant="outline"
          className="h-6 cursor-pointer bg-[#FFF] px-2 text-[12px] text-[#000000] [box-shadow:inset_0_0_0_0.4px_#9E9898CC]"
          onClick={() => {
            publish(`${ADD_RELATIONSHIP_WIDGET}:${EventType.Opened}`)
          }}
        >
          <PlusIcon />
          Add
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

export { RelationshipsTable, type SchemaType as GuardianSchema }
