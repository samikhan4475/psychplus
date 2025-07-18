import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  LongTextCell,
  TextCell,
} from '@/components'
import { Relationship } from '@/types'
import { getMaskedPhoneNumber } from '@/utils'
import { getAddressLabel } from '@/utils/address'
import {
  ActionsCell,
  EmergencyContactCell,
  GuardianCell,
  RelationshipCell,
  RriCell,
} from './cells'

interface RelationshipTableProps {
  patientRelationships: Relationship[]
  loading?: boolean
}

const columns: ColumnDef<Relationship>[] = [
  {
    id: 'relation-first-name',
    header: () => <ColumnHeader label="First Name" />,
    cell: ({ row }) => (
      <TextCell className="whitespace-nowrap">
        {row.original?.name?.firstName}
      </TextCell>
    ),
  },
  {
    id: 'relation-middle-name',
    header: () => <ColumnHeader label="Middle Name" />,
    cell: ({ row }) => <TextCell>{row.original?.name?.middleName}</TextCell>,
  },
  {
    id: 'relation-last-name',
    header: () => <ColumnHeader label="Last Name" />,
    cell: ({ row }) => <TextCell>{row.original?.name?.lastName}</TextCell>,
  },
  {
    id: 'relation-relationship',
    header: () => <ColumnHeader label="Relationship" />,
    cell: RelationshipCell,
  },
  {
    id: 'address',
    header: () => <ColumnHeader label="Address" />,
    cell: ({ row }) => (
      <LongTextCell className="min-w-24 max-w-32 truncate">
        {getAddressLabel('Home', row.original?.contactDetails?.addresses)}
      </LongTextCell>
    ),
  },
  {
    id: 'email',
    header: () => <ColumnHeader label="Email" />,
    cell: ({ row }) => (
      <TextCell>{row.original?.contactDetails?.email}</TextCell>
    ),
  },
  {
    id: 'home-phone',
    header: () => <ColumnHeader label="Home Phone" />,
    cell: ({ row }) => (
      <TextCell className="truncate">
        {getMaskedPhoneNumber(
          row.original?.contactDetails?.phoneNumbers?.[0]?.number ?? '',
        )}
      </TextCell>
    ),
  },
  {
    id: 'emergencyContact',
    header: () => <ColumnHeader label="Emergency Contact" />,
    cell: EmergencyContactCell,
  },
  {
    id: 'rri',
    header: () => <ColumnHeader label="RRI (Request to Release Information)" />,
    cell: RriCell,
  },
  {
    id: 'guardian',
    header: () => <ColumnHeader label="Guardian" />,
    cell: GuardianCell,
  },
  {
    id: 'cell-phone',
    header: () => <ColumnHeader label="Cell Phone" />,
    cell: ({ row }) => (
      <TextCell className="truncate">
        {getMaskedPhoneNumber(
          row?.original?.contactDetails?.phoneNumbers?.[0]?.number ?? '',
        )}
      </TextCell>
    ),
  },
  {
    id: 'relationship-actions',
    header: () => <ColumnHeader label="Actions" />,
    cell: ActionsCell,
  },
]

const RelationshipTable = ({
  patientRelationships,
  loading,
}: RelationshipTableProps) => {
  if (loading) {
    return <LoadingPlaceholder className="min-h-40" />
  }
  return (
    <ScrollArea
      scrollbars="both"
      className="mt-1.5 h-full max-h-52 max-w-[calc(100vw-280px)] flex-1 pr-1"
    >
      <DataTable
        data={patientRelationships ?? []}
        columns={columns}
        theadClass="z-[1]"
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { RelationshipTable }
