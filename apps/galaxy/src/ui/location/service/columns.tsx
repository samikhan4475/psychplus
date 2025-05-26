import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, LongTextCell, TextCell } from '@/components'
import { Service } from '@/types'
import { getPatientFullName } from '@/utils'
import {
  ActionCell,
  EhrCell,
  POSCell,
  PrimaryProviderCell,
  ServiceCell,
  ServiceVisitTypeCell,
  StateCell,
  StatusCell,
  TaxonomyCell,
} from './cells'
import { YesNoBlock } from './yes-no-block'

const columns = (googleApiKey: string): ColumnDef<Service>[] => [
  {
    id: 'locationType',
    accessorKey: 'locationType',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Location Type" />
    ),
    cell: ({ row: { original } }) => (
      <TextCell>{original?.locationType}</TextCell>
    ),
  },
  {
    id: 'locationName',
    accessorKey: 'locationName',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Location Name" />
    ),
    cell: ({ row: { original } }) => (
      <LongTextCell className="min-w-32 max-w-36">
        {original?.locationName}
      </LongTextCell>
    ),
  },
  {
    id: 'serviceOffered',
    accessorKey: 'serviceOffered',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Service" />
    ),
    cell: ServiceCell,
  },
  {
    id: 'servicePlace',
    accessorKey: 'servicePlace',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="POS" />
    ),
    cell: POSCell,
  },
  {
    id: 'taxonomy',
    accessorKey: 'taxonomy',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Taxonomy" />
    ),
    cell: TaxonomyCell,
  },
  {
    id: 'serviceVisitTypes',
    accessorKey: 'serviceVisitTypes',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Visit Type" />
    ),
    cell: ServiceVisitTypeCell,
  },
  {
    id: 'address1',
    accessorKey: 'address.street1',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Primary Address1" />
    ),
    cell: ({ row: { original } }) => (
      <LongTextCell>{original?.address?.street1 ?? 'N/A'}</LongTextCell>
    ),
  },

  {
    id: 'address2',
    accessorKey: 'address.street2',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Address2" />
    ),
    cell: ({ row: { original } }) => (
      <LongTextCell className="min-w-24 max-w-32">
        {original?.address?.street2 ?? 'N/A'}
      </LongTextCell>
    ),
  },
  {
    id: 'city',
    accessorKey: 'address.city',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="City" />
    ),
    cell: ({ row: { original } }) => (
      <LongTextCell className="min-w-24 max-w-32">
        {original?.address?.city}
      </LongTextCell>
    ),
  },
  {
    id: 'address.state',
    accessorKey: 'state',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="State" />
    ),
    cell: StateCell,
  },
  {
    id: 'zipCode',
    accessorKey: 'address.postalCode',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="ZIP" />
    ),
    cell: ({ row: { original } }) => (
      <TextCell>{original?.address?.postalCode}</TextCell>
    ),
  },
  {
    id: 'areaCode',
    accessorKey: 'address.zipLast4',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Area Code" />
    ),
    cell: ({ row: { original } }) => (
      <TextCell>{original?.address?.zipLast4 || 'N/A'}</TextCell>
    ),
  },
  {
    id: 'isPolicyRequired',
    accessorKey: 'isPolicyRequired',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="PsychPlus Policy" />
    ),
    cell: ({ row: { original } }) => (
      <YesNoBlock value={original?.isPolicyRequired} />
    ),
  },
  {
    id: 'reminder',
    header: ({ column }) => <ColumnHeader column={column} label="Reminders" />,
    columns: [
      {
        id: 'isReminderForNotes',
        accessorKey: 'isReminderForNotes',
        header: ({ column }) => (
          <ColumnHeader clientSideSort column={column} label="Prov. Notes" />
        ),
        cell: ({ row: { original } }) => (
          <YesNoBlock value={original?.isReminderForNotes} />
        ),
      },
      {
        id: 'isReminderForVisit',
        accessorKey: 'isReminderForVisit',
        header: ({ column }) => (
          <ColumnHeader clientSideSort column={column} label="Pt. Visits" />
        ),
        cell: ({ row: { original } }) => (
          <YesNoBlock value={original?.isReminderForVisit} />
        ),
      },
    ],
  },
  {
    id: 'billingUsageType',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="EHR Code" />
    ),
    cell: EhrCell,
  },
  {
    id: 'maxBookingFrequencyInSlot',
    accessorKey: 'maxBookingFrequencyInSlot',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        column={column}
        label="Max Booking Frequency"
      />
    ),
    cell: ({ row: { original } }) => (
      <TextCell>{original?.maxBookingFrequencyInSlot}</TextCell>
    ),
  },

  {
    id: 'cosignerType',
    accessorKey: 'coSignerType',

    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Co-Signer Type" />
    ),
    cell: ({ row: { original } }) => (
      <TextCell>{original?.coSignerType}</TextCell>
    ),
  },
  {
    id: 'cosigner',
    accessorKey: 'cosigner.legalName.firstName',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Co-Signer" />
    ),
    cell: ({ row: { original } }) => (
      <LongTextCell>
        {getPatientFullName(original?.cosigner?.legalName) ?? 'N/A'}
      </LongTextCell>
    ),
  },
  {
    id: 'primaryProviderType',
    accessorKey: 'primaryProviderType',

    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Primary Provider" />
    ),
    cell: PrimaryProviderCell,
  },
  {
    id: 'status',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Service status" />
    ),
    cell: StatusCell,
  },
  {
    id: 'action',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Actions" />
    ),
    cell: ({ row }) => <ActionCell row={row} googleApiKey={googleApiKey} />,
  },
]

export { columns }
