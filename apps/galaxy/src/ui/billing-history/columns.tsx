import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, LongTextCell, TextCell } from '@/components'
import { formatCurrency, formatDateTime, getSlashedDateString } from '@/utils'
import { SignCell } from './cells'
import { BillingHistory } from './types'

const columns: ColumnDef<BillingHistory>[] = [
  {
    accessorKey: 'claimNumber',
    size: 50,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Claim #" />
    ),
    cell: ({ row }) => <TextCell>{row.original?.claimNumber} </TextCell>,
  },
  {
    accessorKey: 'dateOfServiceFrom',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        clientSideSort
        label="Date of Service (DOS)"
      />
    ),
    cell: ({ row }) => (
      <TextCell>
        {row.original?.dateOfServiceFrom &&
          getSlashedDateString(row.original?.dateOfServiceFrom)}
      </TextCell>
    ),
  },
  {
    accessorKey: 'patientStatusCode',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Patient Status" />
    ),
    cell: ({ row }) => <TextCell>{row.original.patientStatusCode} </TextCell>,
  },
  {
    accessorKey: 'locationName',
    size: 200,

    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Location" />
    ),
    cell: ({ row }) => (
      <LongTextCell className="min-w-24 max-w-32">
        {row.original.locationName}
      </LongTextCell>
    ),
  },
  {
    accessorKey: 'serviceType',
    size: 200,

    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Service" />
    ),
    cell: ({ row }) => (
      <LongTextCell className="min-w-24 max-w-32">
        {row.original.locationService}
      </LongTextCell>
    ),
  },
  {
    accessorKey: 'visitType',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Visit Type" />
    ),
    cell: ({ row }) => (
      <TextCell className="truncate">{row.original.visitType}</TextCell>
    ),
  },
  {
    accessorKey: 'visitSequence',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Visit Sequence" />
    ),
    cell: ({ row }) => <TextCell>{row.original.visitSequence}</TextCell>,
  },
  {
    accessorKey: 'visitMedium',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Visit Medium" />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original?.visitMedium ?? 'N/A'}</TextCell>
    ),
  },
  {
    accessorKey: 'primaryInsuranceDescription',
    size: 120,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Primary Ins." />
    ),
    cell: ({ row }) => (
      <TextCell className="truncate">
        {row.original.primaryInsuranceDescription}
      </TextCell>
    ),
  },
  {
    accessorKey: 'secondaryInsuranceDescription',
    size: 120,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Secondary Ins." />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.secondaryInsuranceDescription}</TextCell>
    ),
  },
  {
    accessorKey: 'doctorName',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Provider" />
    ),
    cell: ({ row }) => (
      <TextCell className="truncate">{row.original?.doctorName}</TextCell>
    ),
  },
  {
    accessorKey: 'cosignerName',
    size: 50,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Cosigner" />
    ),
    cell: ({ row }) => <TextCell>{row.original.cosignerName}</TextCell>,
  },
  {
    accessorKey: 'diagnosisDisplayName',
    size: 50,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Diagnosis" />
    ),
    cell: ({ row }) => (
      <LongTextCell className="min-w-32">
        {row.original.diagnosisDisplayName}
      </LongTextCell>
    ),
  },
  {
    accessorKey: 'cptCode',
    size: 50,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="CPT" />
    ),
    cell: ({ row }) => <TextCell>{row.original?.cptCode}</TextCell>,
  },
  {
    accessorKey: 'patientCmd',
    size: 50,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="CMD" />
    ),
    cell: ({ row }) => <TextCell>{row.original.patientCmd}</TextCell>,
  },
  {
    accessorKey: 'appointmentStatus',
    size: 50,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Visit Status" />
    ),
    cell: ({ row }) => <TextCell>{row.original?.appointmentStatus}</TextCell>,
  },
  {
    accessorKey: 'verification',
    size: 50,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="VIS" />
    ),
    cell: ({ row }) => <TextCell>{row.original?.verification}</TextCell>,
  },
  {
    accessorKey: 'cptStatus',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Billing Status" />
    ),
    cell: ({ row }) => <TextCell>{row.original?.cptStatus}</TextCell>,
  },
  {
    id: 'copay',
    header: ({ column }) => <ColumnHeader column={column} label="CoPay" />,
    columns: [
      {
        accessorKey: 'coPayDue',
        size: 50,
        header: ({ column }) => (
          <ColumnHeader column={column} clientSideSort label="Due" />
        ),
        cell: ({ row }) => (
          <TextCell>{formatCurrency(Number(row.original?.coPayDue))}</TextCell>
        ),
      },
      {
        accessorKey: 'coPayPaid',
        size: 50,
        header: ({ column }) => (
          <ColumnHeader column={column} clientSideSort label="Paid" />
        ),
        cell: ({ row }) => (
          <TextCell>{formatCurrency(Number(row.original.coPayPaid))}</TextCell>
        ),
      },
    ],
  },
  {
    id: 'coins',
    header: ({ column }) => <ColumnHeader column={column} label="CoIns" />,
    columns: [
      {
        accessorKey: 'coInsDue',
        size: 50,
        header: ({ column }) => (
          <ColumnHeader column={column} clientSideSort label="Due" />
        ),
        cell: ({ row }) => (
          <TextCell>{formatCurrency(Number(row.original.coInsDue))}</TextCell>
        ),
      },
      {
        accessorKey: 'coInsPaid',
        size: 50,
        header: ({ column }) => (
          <ColumnHeader column={column} clientSideSort label="Paid" />
        ),
        cell: ({ row }) => (
          <TextCell>{formatCurrency(Number(row.original.coInsPaid))}</TextCell>
        ),
      },
    ],
  },
  {
    id: 'balance',
    header: ({ column }) => <ColumnHeader column={column} label="Balance" />,
    columns: [
      {
        accessorKey: 'balanceDue',
        size: 50,
        header: ({ column }) => (
          <ColumnHeader column={column} clientSideSort label="Due" />
        ),
        cell: ({ row }) => (
          <TextCell>{formatCurrency(Number(row.original.balanceDue))}</TextCell>
        ),
      },
      {
        accessorKey: 'balancePaid',
        size: 50,
        header: ({ column }) => (
          <ColumnHeader column={column} clientSideSort label="Paid" />
        ),
        cell: ({ row }) => (
          <TextCell>
            {formatCurrency(Number(row.original.balancePaid))}
          </TextCell>
        ),
      },
    ],
  },
  {
    accessorKey: 'claimCreatedDate',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Created On" />
    ),
    cell: ({ row }) => (
      <TextCell className="truncate">
        {row?.original?.appointmentDateTime &&
          formatDateTime(row?.original?.claimCreatedDate)}
      </TextCell>
    ),
  },
  {
    accessorKey: 'claimSubmittedDate',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Submitted On" />
    ),
    cell: ({ row }) => (
      <TextCell className="truncate">
        {row.original?.claimSubmittedDate &&
          getSlashedDateString(row.original?.claimSubmittedDate)}
      </TextCell>
    ),
  },
  {
    accessorKey: 'isSigned',
    size: 50,
    header: () => <ColumnHeader label="Sign Note" />,
    cell: SignCell,
  },

  //Todo in phase 2
  // {
  //   accessorKey: 'Action',
  //   size: 50,
  //   header: () => <ColumnHeader label="Action" />,
  //   cell: ActionsCell,
  // },
]

export { columns }
