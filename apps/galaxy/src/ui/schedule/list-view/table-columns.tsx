import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons'
import { Text } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import {
  ActionsCell,
  GroupSelectCell,
  LegalSelectCell,
  NoteSignedCell,
  RoomSelectCell,
  UnitSelectCell,
  VisitSequenceSelectCell,
  VisitStatusSelectCell,
} from '../shared/table-cells'
import { Appointment, VerificationStatus } from '../types'
import { formatDateCell, formatTimeCell } from '../utils'

const verificationStatus = (status: string): JSX.Element => {
  switch (status) {
    case VerificationStatus.Verified:
      return <CheckCircledIcon className="text-pp-states-success" />
    case VerificationStatus.UnVerifiable:
      return <CrossCircledIcon className="text-pp-states-error" />
    default:
      return <Text>?</Text>
  }
}

const columns: ColumnDef<Appointment>[] = [
  {
    id: 'date-header',
    accessorKey: 'appointmentDate',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justfy-center !font-medium"
        column={column}
        label="Visit Date"
      />
    ),
    cell: ({ row }) => (
      <TextCell>{formatDateCell(row.original.appointmentDate)}</TextCell>
    ),
    enableHiding: false,
  },
  {
    id: 'time',
    accessorKey: 'time',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justfy-center !font-medium"
        column={column}
        label="Time"
      />
    ),
    cell: ({ row }) => (
      <TextCell>{formatTimeCell(row.original.appointmentDate)}</TextCell>
    ),
    enableHiding: true,
  },
  {
    id: 'service',
    accessorKey: 'service',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justfy-center !font-medium"
        column={column}
        label="Service"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="whitespace-nowrap">{row.original.service}</TextCell>
    ),
  },
  {
    id: 'patient-name',
    accessorKey: 'name',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justfy-center !font-medium"
        column={column}
        label="Name"
      />
    ),
    cell: ({ row }) => <TextCell className='whitespace-nowrap'>{row.original.name}</TextCell>,
    enableHiding: false,
  },
  {
    id: 'age',
    accessorKey: 'age',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justfy-center !font-medium"
        column={column}
        label="Age"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.age}</TextCell>,
    enableHiding: false,
  },
  {
    id: 'gender',
    accessorKey: 'gender',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justfy-center !font-medium"
        column={column}
        label="Gender"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.gender}</TextCell>,
  },
  {
    id: 'date-of-birth',
    accessorKey: 'dob',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justfy-center !font-medium"
        column={column}
        label="DOB"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="whitespace-nowrap">{row.original.dob}</TextCell>
    ),
  },
  {
    id: 'patient-status',
    accessorKey: 'patientStatus',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justfy-center !font-medium"
        column={column}
        label="Pt. Status"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.patientStatus}</TextCell>,
    enableHiding: true,
  },
  {
    accessorKey: 'verify',
    header: ({ column }) => (
      <ColumnHeader
        className="!text-black justfy-center mx-auto !font-medium"
        column={column}
        label="Verify"
      />
    ),
    columns: [
      {
        accessorKey: 'p',
        header: ({ column }) => (
          <ColumnHeader
            clientSideSort
            className="!text-black justfy-center !font-medium"
            column={column}
            label="P"
          />
        ),
        cell: ({ row }) => (
          <TextCell>
            {verificationStatus(row.original.patientInfoVerificationStatus)}
          </TextCell>
        ),
        enableHiding: false,
      },
      {
        accessorKey: 'i',
        header: ({ column }) => (
          <ColumnHeader
            clientSideSort
            className="!text-black justfy-center !font-medium"
            column={column}
            label="I"
          />
        ),
        cell: ({ row }) => (
          <TextCell className="pl-1">
            {verificationStatus(
              row.original.patientInsuranceVerificationStatus,
            )}
          </TextCell>
        ),
        enableHiding: false,
      },
      {
        accessorKey: 'c',
        header: ({ column }) => (
          <ColumnHeader
            clientSideSort
            className="!text-black justfy-center !font-medium"
            column={column}
            label="C"
          />
        ),
        cell: ({ row }) => (
          <TextCell>
            {verificationStatus(row.original.patientConsentStatus)}
          </TextCell>
        ),
        enableHiding: false,
      },
      {
        accessorKey: 'cc',
        header: ({ column }) => (
          <ColumnHeader
            clientSideSort
            className="!text-black justfy-center !font-medium"
            column={column}
            label="CC"
          />
        ),
        cell: ({ row }) => (
          <TextCell className="pl-1">
            {row.original.patientCardVerificationStatus ? (
              <CheckCircledIcon className="text-pp-states-success" />
            ) : (
              <CrossCircledIcon className="text-pp-states-error" />
            )}
          </TextCell>
        ),
        enableHiding: false,
      },
    ],
  },
  {
    id: 'state',
    accessorKey: 'state',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justfy-center !font-medium"
        column={column}
        label="State"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.state}</TextCell>,
  },
  {
    id: 'location',
    accessorKey: 'clinicLocation',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justfy-center !font-medium"
        column={column}
        label="Location"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="whitespace-nowrap">
        {row.original.locationName}
      </TextCell>
    ),
  },

  {
    id: 'provider-type',
    accessorKey: 'providerType',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justfy-center !font-medium"
        column={column}
        label="Provider Type"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.providerType}</TextCell>,
    enableHiding: false,
  },
  {
    id: 'provider',
    accessorKey: 'provider',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justfy-center !font-medium"
        column={column}
        label="Provider"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="whitespace-nowrap">
        {row.original.providerName}
      </TextCell>
    ),
    enableHiding: true,
  },
  {
    id: 'primary-insurance',
    accessorKey: 'primaryInsuranceName',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justfy-center !font-medium"
        column={column}
        label="Primary Insurance"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.primaryInsuranceName}</TextCell>,
    enableHiding: true,
  },
  {
    id: 'secondary-insurance',
    accessorKey: 'secondaryInsuranceName',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justfy-center !font-medium"
        column={column}
        label="Secondary Insurance"
      />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.secondaryInsuranceName}</TextCell>
    ),
    enableHiding: true,
  },
  {
    accessorKey: 'visit',
    header: ({ column }) => (
      <ColumnHeader
        className="!text-black justfy-center mx-auto !font-medium"
        column={column}
        label="Visit"
      />
    ),
    columns: [
      {
        accessorKey: 'visitType',
        header: ({ column }) => (
          <ColumnHeader
            clientSideSort
            className="!text-black justfy-center !font-medium"
            column={column}
            label="Type"
          />
        ),
        cell: ({ row }) => <TextCell className='whitespace-nowrap'>{row.original.visitType}</TextCell>,
        enableHiding: false,
      },
      {
        accessorKey: 'visitSequence',
        header: ({ column }) => (
          <ColumnHeader
            clientSideSort
            className="!text-black justfy-center !font-medium"
            column={column}
            label="Sequence"
          />
        ),
        cell: ({ row }) => <VisitSequenceSelectCell row={row} />,
        enableHiding: false,
      },
      {
        accessorKey: 'visitMedium',
        header: ({ column }) => (
          <ColumnHeader
            clientSideSort
            className="!text-black justfy-center !font-medium"
            column={column}
            label="Medium"
          />
        ),
        cell: ({ row }) => <TextCell>{row.original.visitMedium}</TextCell>,
        enableHiding: false,
      },
      {
        accessorKey: 'visitStatus',
        header: ({ column }) => (
          <ColumnHeader
            clientSideSort
            className="!text-black justfy-center !font-medium"
            column={column}
            label="Status"
          />
        ),
        cell: ({ row }) => <VisitStatusSelectCell row={row} />,
        enableHiding: false,
      },
      {
        accessorKey: 'insuranceVerification',
        header: ({ column }) => (
          <ColumnHeader
            clientSideSort
            className="!text-black justfy-center !font-medium"
            column={column}
            label="Ins Verification"
          />
        ),
        cell: ({ row }) => (
          <TextCell>{row.original.insuranceVerification}</TextCell>
        ),
        enableHiding: false,
      },
    ],
  },
  {
    id: 'co-payment',
    accessorKey: 'copay',
    header: ({ column }) => (
      <ColumnHeader
        className="!text-black justfy-center !font-medium"
        column={column}
        label="Co-Pay"
      />
    ),
    enableHiding: true,
    columns: [
      {
        id: 'copay-due',
        accessorKey: 'copayDue',
        header: ({ column }) => (
          <ColumnHeader
            clientSideSort
            className="!text-black justfy-center !font-medium"
            column={column}
            label="Due"
          />
        ),
        cell: ({ row }) => (
          <TextCell hasPayment>{row.original.copayDue}</TextCell>
        ),
        enableHiding: true,
      },
      {
        id: 'copay-paid',
        accessorKey: 'copayPaid',
        header: ({ column }) => (
          <ColumnHeader
            clientSideSort
            className="!text-black justfy-center !font-medium"
            column={column}
            label="Paid"
          />
        ),
        cell: ({ row }) => (
          <TextCell hasPayment>{row.original.copayPaid}</TextCell>
        ),
        enableHiding: true,
      },
    ],
  },
  {
    id: 'co-insurance',
    accessorKey: 'coIns',
    header: ({ column }) => (
      <ColumnHeader
        className="!text-black justfy-center !font-medium"
        column={column}
        label="Co-Ins"
      />
    ),
    enableHiding: true,
    columns: [
      {
        id: 'coIns-due',
        accessorKey: 'copayDue',
        header: ({ column }) => (
          <ColumnHeader
            clientSideSort
            className="!text-black justfy-center !font-medium"
            column={column}
            label="Due"
          />
        ),
        cell: ({ row }) => (
          <TextCell hasPayment>{row.original.coInsuranceDue}</TextCell>
        ),
      },
      {
        id: 'coIns-paid',
        accessorKey: 'copayPaid',
        header: ({ column }) => (
          <ColumnHeader
            clientSideSort
            className="!text-black justfy-center !font-medium"
            column={column}
            label="Paid"
          />
        ),
        cell: ({ row }) => (
          <TextCell hasPayment>{row.original.coInsurancePaid}</TextCell>
        ),
      },
    ],
  },
  {
    id: 'balance',
    accessorKey: 'balance',
    header: ({ column }) => (
      <ColumnHeader
        className="!text-black justfy-center !font-medium"
        column={column}
        label="Balance"
      />
    ),
    enableHiding: true,
    columns: [
      {
        id: 'balance-due',
        accessorKey: 'balanceDue',
        header: ({ column }) => (
          <ColumnHeader
            clientSideSort
            className="!text-black justfy-center !font-medium"
            column={column}
            label="Due"
          />
        ),
        cell: ({ row }) => (
          <TextCell hasPayment>{row.original.balanceDue}</TextCell>
        ),
      },
      {
        id: 'balance-paid',
        accessorKey: 'balancePaid',
        header: ({ column }) => (
          <ColumnHeader
            clientSideSort
            className="!text-black justfy-center !font-medium"
            column={column}
            label="Paid"
          />
        ),
        cell: ({ row }) => (
          <TextCell hasPayment>{row.original.balancePaid}</TextCell>
        ),
      },
    ],
  },
  {
    id: 'unit',
    accessorKey: 'unitResource.unit',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justfy-center !font-medium"
        column={column}
        label="Unit"
      />
    ),
    cell: ({ row }) => <UnitSelectCell />,
    enableHiding: true,
  },
  {
    id: 'room',
    accessorKey: 'room',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justfy-center !font-medium"
        column={column}
        label="Room"
      />
    ),
    cell: ({ row }) => <RoomSelectCell />,
  },
  {
    id: 'appointment-group',
    accessorKey: 'groupResource.group',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justfy-center !font-medium"
        column={column}
        label="Group"
      />
    ),
    cell: ({ row }) => <GroupSelectCell />,
    enableHiding: true,
  },
  {
    id: 'date-of-admission',
    accessorKey: 'doa',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justfy-center !font-medium"
        column={column}
        label="DOA"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.dateOfAdmission}</TextCell>,
    enableHiding: true,
  },
  {
    id: 'length-of-stay',
    accessorKey: 'lengthOfStay',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justfy-center !font-medium"
        column={column}
        label="LOS"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.lengthOfStay}</TextCell>,
    enableHiding: true,
  },
  {
    id: 'last-coverage-date',
    accessorKey: 'lastCoverageDate',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justfy-center !font-medium"
        column={column}
        label="LCD"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.lastCoverageDate}</TextCell>,
    enableHiding: true,
  },
  {
    id: 'authorization-number',
    accessorKey: 'authorizationNumber',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justfy-center !font-medium"
        column={column}
        label="Auth #"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.authorizationNumber}</TextCell>,
    enableHiding: true,
  },
  {
    id: 'legal-status',
    accessorKey: 'legalStatus',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justfy-center !font-medium"
        column={column}
        label="Legal"
      />
    ),
    cell: ({ row }) => <LegalSelectCell />,
    enableHiding: true,
  },

  {
    id: 'note-signed',
    accessorKey: 'isNoteSigned',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justfy-center !font-medium"
        column={column}
        label="Note Signed"
      />
    ),
    cell: ({ row }) => <NoteSignedCell row={row} />,
  },
  {
    id: 'actions-column',
    header: () => <ColumnHeader label="Actions" className="!font-medium" />,
    cell: ({ row }) => <ActionsCell />,
  },
]

export { columns }
