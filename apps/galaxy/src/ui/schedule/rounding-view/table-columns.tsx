import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, LongTextCell, TextCell } from '@/components'
import {
  ActionsCell,
  InsuranceVerificationStatusCell,
  LegalSelectCell,
  NoteSignedCell,
  VisitMediumCell,
  VisitSequenceSelectCell,
  VisitStatusSelectCell,
} from '../shared/table-cells'
import { formatDateCell, formatTimeCell } from '../utils'
import { GroupSelectCell, UnitSelectCell } from './table-cells'
import { formatDateOfBirth } from '@/utils'
import { Appointment } from '@/types'

const columns: ColumnDef<Appointment>[] = [
  {
    id: 'date-header',
    accessorKey: 'appointmentDate',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justfy-center !font-medium"
        column={column}
        label="Date"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="whitespace-nowrap">
        {formatDateCell(
          row.original.appointmentDate,
          row.original.locationTimezoneId,
        )}
      </TextCell>
    ),
    enableHiding: false,
  },
  {
    id: 'time-header',
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
      <TextCell className="whitespace-nowrap">
        {row.original.isServiceTimeDependent
          ? formatTimeCell(
              row.original.appointmentDate,
              row.original.locationTimezoneId,
            )
          : 'N/A'}
      </TextCell>
    ),
    enableHiding: false,
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
    cell: ({ row }) => (
      <TextCell className="whitespace-nowrap">{row.original.name}</TextCell>
    ),
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
      <TextCell className="whitespace-nowrap">{formatDateOfBirth(row.original.dob)}</TextCell>
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
    cell: ({ row }) => <UnitSelectCell row={row} />,
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
    cell: ({ row }) => <GroupSelectCell row={row} />,
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
      <TextCell>{row.original.secondaryInsuranceName ?? 'N/A'}</TextCell>
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
        cell: ({ row }) => (
          <LongTextCell>{row.original.visitType}</LongTextCell>
        ),
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
        cell: ({ row }) => <VisitMediumCell row={row} />,
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
            label="Ins. Verification"
          />
        ),
        cell: ({ row }) => <InsuranceVerificationStatusCell row={row} />,
        enableHiding: false,
      },
    ],
  },
  {
    id: 'diagnosis',
    accessorKey: 'diagnosis',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justfy-center !font-medium"
        column={column}
        label="Diagnosis"
      />
    ),
    cell: ({ row }) => (
      <TextCell>
        {row.original.diagnosis[row.original.diagnosis.length - 1]?.icd10Code ??
          ''}
      </TextCell>
    ),
    enableHiding: false,
  },
  {
    id: 'cpt-code',
    accessorKey: 'cptCodes',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justfy-center !font-medium"
        column={column}
        label="CPT Codes"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.cptCodes.join(',')}</TextCell>,
    enableHiding: false,
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
    enableHiding: false,
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
    enableHiding: false,
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
    cell: ({ row }) => (
      <TextCell>{row.original.lastCoverageDate ?? ''}</TextCell>
    ),
    enableHiding: false,
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
    cell: ({ row }) => <LegalSelectCell row={row} />,
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
    cell: ({ row }) => <ActionsCell appointmentId={row.original.appointmentId} />,
  },
]

export { columns }
