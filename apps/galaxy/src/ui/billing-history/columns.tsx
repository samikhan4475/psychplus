import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { formatCurrency, getSlashedDateString } from '@/utils'
import { ActionsCell, SignCell } from './cells'
import { BillingHistory } from './types'

const columns: ColumnDef<BillingHistory>[] = [
  {
    accessorKey: 'claimNo',
    size: 50,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort sortable label="Claim #" />
    ),
    cell: ({ row }) => <TextCell>{row.original?.claimNo} </TextCell>,
  },
  {
    accessorKey: 'dateOfService',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        clientSideSort
        sortable
        label="Date of Service (DOS)"
      />
    ),
    cell: ({ row }) => (
      <TextCell>
        {row.original?.dateOfService &&
          getSlashedDateString(row.original?.dateOfService)}
      </TextCell>
    ),
  },
  {
    accessorKey: 'patientStatusCode',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        clientSideSort
        sortable
        label="Patient Status"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.patientStatusCode} </TextCell>,
  },
  {
    accessorKey: 'locationName',
    size: 200,

    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort sortable label="Location" />
    ),
    cell: ({ row }) => <TextCell>{row.original.locationName} </TextCell>,
  },
  {
    accessorKey: 'visitType',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        clientSideSort
        sortable
        label="Visit Type"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.visitType}</TextCell>,
  },
  {
    accessorKey: 'visitSequence',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        clientSideSort
        sortable
        label="Visit Sequence"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.visitSequence}</TextCell>,
  },
  {
    accessorKey: 'visitMedium',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        clientSideSort
        sortable
        label="Visit Medium"
      />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original?.visitMedium ?? 'N/A'}</TextCell>
    ),
  },
  {
    accessorKey: 'primaryInsuranceDescription',
    size: 120,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        clientSideSort
        sortable
        label="Primary Ins."
      />
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
      <ColumnHeader
        column={column}
        clientSideSort
        sortable
        label="Secondary Ins."
      />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.secondaryInsuranceDescription}</TextCell>
    ),
  },
  {
    accessorKey: 'provider',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort sortable label="Provider" />
    ),
    cell: ({ row }) => (
      <TextCell className="truncate">{row.original?.doctorName}</TextCell>
    ),
  },
  {
    accessorKey: 'cosignerName',
    size: 50,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort sortable label="Cosigner" />
    ),
    cell: ({ row }) => <TextCell>{row.original.cosignerName}</TextCell>,
  },
  {
    accessorKey: 'diagnosisDisplayName',
    size: 50,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort sortable label="Diagnosis" />
    ),
    cell: ({ row }) => <TextCell>{row.original.diagnosisDisplayName}</TextCell>,
  },
  {
    accessorKey: 'patientCpt',
    size: 50,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort sortable label="CPT" />
    ),
    cell: ({ row }) => <TextCell>{row.original?.patientCpt}</TextCell>,
  },
  {
    accessorKey: 'patientCmd',
    size: 50,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort sortable label="CMD" />
    ),
    cell: ({ row }) => <TextCell>{row.original.patientCmd}</TextCell>,
  },
  {
    accessorKey: 'appointmentStatus',
    size: 50,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        clientSideSort
        sortable
        label="Visit Status"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original?.appointmentStatus}</TextCell>,
  },
  {
    accessorKey: 'vis',
    size: 50,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort sortable label="VIS" />
    ),
    cell: ({ row }) => <TextCell>{row.original?.vis}</TextCell>,
  },
  {
    accessorKey: 'cptStatus',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        clientSideSort
        sortable
        label="Billing Status"
      />
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
          <ColumnHeader column={column} clientSideSort sortable label="Due" />
        ),
        cell: ({ row }) => (
          <TextCell>{formatCurrency(Number(row.original?.coPayDue))}</TextCell>
        ),
      },
      {
        accessorKey: 'coPayPaid',
        size: 50,
        header: ({ column }) => (
          <ColumnHeader column={column} clientSideSort sortable label="Paid" />
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
          <ColumnHeader column={column} clientSideSort sortable label="Due" />
        ),
        cell: ({ row }) => (
          <TextCell>{formatCurrency(Number(row.original.coInsDue))}</TextCell>
        ),
      },
      {
        accessorKey: 'coInsPaid',
        size: 50,
        header: ({ column }) => (
          <ColumnHeader column={column} clientSideSort sortable label="Paid" />
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
          <ColumnHeader column={column} clientSideSort sortable label="Due" />
        ),
        cell: ({ row }) => (
          <TextCell>{formatCurrency(Number(row.original.balanceDue))}</TextCell>
        ),
      },
      {
        accessorKey: 'balancePaid',
        size: 50,
        header: ({ column }) => (
          <ColumnHeader column={column} clientSideSort sortable label="Paid" />
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
    accessorKey: 'createdOn',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        clientSideSort
        sortable
        label="Created On"
      />
    ),
    cell: ({ row }) => (
      <TextCell>
        {row.original?.createdOn &&
          getSlashedDateString(row.original?.createdOn)}
      </TextCell>
    ),
  },
  {
    accessorKey: 'submittedOn',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        clientSideSort
        sortable
        label="Submitted On"
      />
    ),
    cell: ({ row }) => (
      <TextCell>
        {row.original?.submittedOn &&
          getSlashedDateString(row.original?.submittedOn)}
      </TextCell>
    ),
  },
  {
    accessorKey: 'isSigned',
    size: 50,
    header: () => <ColumnHeader label="Sign Note" />,
    cell: SignCell,
  },
  {
    accessorKey: 'Action',
    size: 50,
    header: () => <ColumnHeader label="Action" />,
    cell: ActionsCell,
  },
]

export { columns }
