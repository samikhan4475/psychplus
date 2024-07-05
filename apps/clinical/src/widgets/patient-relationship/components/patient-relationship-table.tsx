import { PlusIcon } from '@radix-ui/react-icons'
import { Box, Flex, Heading, Text } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import { type PatientRelationship } from '@psychplus/patient'
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
import { useStore } from '../store'
import { EmergencyContactSwitch } from './emergency-contact-switch'
import { RowActionDelete } from './row-action-delete'
import { RowActionEdit } from './row-action-edit'
import { RriSwitch } from './rri-switch'
import { GuardianStatusSwitch } from './guardian-status-switch'
import { RelationshipTextField } from './relationship-text-field'

const rowActions: RowAction<PatientRelationship>[] = [
  {
    id: 'patient-relationships-row-action-edit',
    render: RowActionEdit,
  },
  {
    id: 'patient-relationships-row-action-details',
    render: RowActionDelete,
  },
]

const columns: ColumnDef<PatientRelationship>[] = [
  {
    id: 'first-name',
    accessorKey: 'name.firstName',
    header: () => <Text className="font-[400]">First Name</Text>,
    cell: ({ row }) => (
      <TableCellText
        className="text-[12px]"
        text={row.original.name?.firstName}
      />
    ),
  },
  {
    id: 'middle-name',
    accessorKey: 'name.middleName',
    header: () => <Text className="font-[400]">Middle Name</Text>,
    cell: ({ row }) => (
      <TableCellText
        className="text-[12px]"
        text={row.original.name?.middleName}
      />
    ),
  },
  {
    id: 'last-name',
    accessorKey: 'name.lastName',
    header: () => <Text className="font-[400]">Last Name</Text>,
    cell: ({ row }) => (
      <TableCellText
        className="text-[12px]"
        text={row.original.name?.lastName}
      />
    ),
  },
  {
    id: 'relationship',
    accessorKey: 'guardianRelationship',
    header: () => <Text className="font-[400]">Relationship</Text>,
    cell: ({ row }) => (
      <RelationshipTextField row={row} />
    ),
  },
  {
    id: 'address1',
    accessorKey: 'contactDetails.addresses[0].street1',
    header: () => <Text className="font-[400]">Address 1</Text>,
    cell: ({ row }) => (
      <TableCellText
        className="text-[12px]"
        text={row.original.contactDetails?.addresses?.[0].street1 ?? ''}
      />
    ),
  },
  {
    id: 'email',
    accessorKey: 'contactDetails.email',
    header: () => <Text className="font-[400]">Email</Text>,
    cell: ({ row }) => (
      <TableCellText
        className="text-[12px]"
        text={row.original.contactDetails?.email ?? ''}
      />
    ),
  },
  {
    id: 'home-phone',
    accessorKey: 'contactDetails.phoneNumbers',
    header: () => <Text className="font-[400]">Home Phone</Text>,
    cell: ({ row }) => (
      <TableCellText
        className="text-[12px]"
        text={
          row.original.contactDetails?.phoneNumbers?.find(
            (number) => number.type === 'Home',
          )?.number
        }
      />
    ),
  },
  {
    id: 'Emergency Contact',
    accessorKey: 'isEmergencyContact',
    header: () => <Text className="font-[400]">Emergency Contact</Text>,
    cell: ({ row }) => <EmergencyContactSwitch row={row} />,
  },
  {
    id: 'rri',
    accessorKey: 'isAllowedToReleaseInformation',
    header: () => <Text className="font-[400]">RRI</Text>,
    cell: ({ row }) => <RriSwitch row={row} />,
  },
  {
    id: 'Guardian',
    accessorKey: 'isGuardian',
    header: () => <Text className="font-[400]">Guardian</Text>,
    cell: ({ row }) => <GuardianStatusSwitch row={row} />,
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

const RelationshipsTable = () => {
  const { publish } = usePubsub()
  const patientRelationships = useStore((state) => state.patientRelationships)

  return (
    <Flex direction="column">
      <Flex
        justify="between"
        className="bg-[#EEF2F6] px-2 pb-[2px] pt-[4px]"
        align="center"
      >
        <Heading className="text-[14px]">Relationship</Heading>
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
          data={patientRelationships}
          columns={columns}
        />
      </Box>
    </Flex>
  )
}

export { RelationshipsTable }
