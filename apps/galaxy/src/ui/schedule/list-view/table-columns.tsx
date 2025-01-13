import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { Appointment } from '@/types'
import { formatDateOfBirth } from '@/utils'
import {
  InsuranceVerificationStatusCell,
  LegalSelectCell,
  ServiceCell,
  VisitSequenceSelectCell,
  VisitStatusSelectCell,
} from '../shared/table-cells'
import { GenderCell } from '../shared/table-cells/gender-cell'
import { ProviderTypeCell } from '../shared/table-cells/provider-type-cell'
import { StateCell } from '../shared/table-cells/state-cell'
import { formatDateCell, formatTimeCell } from '../utils'
import {
  ActionsCell,
  GroupSelectCell,
  RoomSelectCell,
  UnitSelectCell,
  VerificationStatusCell,
  VisitMediumCell,
} from './table-cells'

const columns: ColumnDef<Appointment>[] = [
  {
    id: 'date-header',
    accessorKey: 'appointmentDate',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justify-center !font-medium"
        column={column}
        label="Visit Date"
      />
    ),
    cell: ({ row }) => (
      <TextCell>
        {formatDateCell(
          row.original.appointmentDate,
          row.original.locationTimezoneId,
        )}
      </TextCell>
    ),
    enableHiding: false,
  },
  {
    id: 'time',
    accessorKey: 'time',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justify-center !font-medium"
        column={column}
        label="Time"
      />
    ),
    cell: ({ row }) => (
      <TextCell empty={!row.original.isServiceTimeDependent}>
        {formatTimeCell(
          row.original.appointmentDate,
          row.original.locationTimezoneId,
        )}
      </TextCell>
    ),
    enableHiding: true,
  },
  {
    id: 'service',
    accessorKey: 'service',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justify-center !font-medium"
        column={column}
        label="Service"
      />
    ),
    cell: ({ row }) => <ServiceCell serviceCode={row.original.service} />,
  },
  {
    id: 'patient-name',
    accessorKey: 'name',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justify-center !font-medium"
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
        className="!text-black justify-center !font-medium"
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
        className="!text-black justify-center !font-medium"
        column={column}
        label="Gender"
      />
    ),
    cell: ({ row }) => <GenderCell value={row.original.gender} />,
  },
  {
    id: 'date-of-birth',
    accessorKey: 'dob',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justify-center !font-medium"
        column={column}
        label="DOB"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="whitespace-nowrap">
        {formatDateOfBirth(row.original.dob)}
      </TextCell>
    ),
  },
  {
    id: 'patient-status',
    accessorKey: 'patientStatus',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justify-center !font-medium"
        column={column}
        label="User Status"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.patientStatus}</TextCell>,
    enableHiding: true,
  },
  {
    accessorKey: 'verify',
    header: ({ column }) => (
      <ColumnHeader
        className="!text-black mx-auto justify-center !font-medium"
        column={column}
        label="Verify"
      />
    ),
    columns: [
      {
        accessorKey: 'patientInfoVerificationStatus',
        header: ({ column }) => (
          <ColumnHeader
            clientSideSort
            className="!text-black justify-center !font-medium"
            column={column}
            label="P"
          />
        ),
        cell: ({ row }) => (
          <VerificationStatusCell
            value={row.original.patientInfoVerificationStatus}
          />
        ),
        enableHiding: false,
      },
      {
        accessorKey: 'patientInsuranceVerificationStatus',
        header: ({ column }) => (
          <ColumnHeader
            clientSideSort
            className="!text-black justify-center !font-medium"
            column={column}
            label="I"
          />
        ),
        cell: ({ row }) => (
          <VerificationStatusCell
            value={row.original.patientInsuranceVerificationStatus}
          />
        ),
        enableHiding: false,
      },
      {
        accessorKey: 'patientConsentStatus',
        header: ({ column }) => (
          <ColumnHeader
            clientSideSort
            className="!text-black justify-center !font-medium"
            column={column}
            label="P&C"
          />
        ),
        cell: ({ row }) => (
          <VerificationStatusCell value={row.original.patientConsentStatus} />
        ),
        enableHiding: false,
      },
      {
        accessorKey: 'patientCardVerificationStatus',
        header: ({ column }) => (
          <ColumnHeader
            clientSideSort
            className="!text-black justify-center !font-medium"
            column={column}
            label="CC"
          />
        ),
        cell: ({ row }) => (
          <TextCell className="pl-1">
            {row.original.patientCardVerificationStatus ? 'Yes' : 'No'}
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
        className="!text-black justify-center !font-medium"
        column={column}
        label="State"
      />
    ),
    cell: ({ row }) => <StateCell code={row.original.stateCode} />,
  },
  {
    id: 'location',
    accessorKey: 'locationName',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justify-center !font-medium"
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
        className="!text-black justify-center !font-medium"
        column={column}
        label="Provider Type"
      />
    ),
    cell: ({ row }) => <ProviderTypeCell code={row.original.providerType} />,
    enableHiding: false,
  },
  {
    id: 'provider',
    accessorKey: 'providerName',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justify-center !font-medium"
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
        className="!text-black justify-center !font-medium"
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
        className="!text-black justify-center !font-medium"
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
        className="!text-black mx-auto justify-center !font-medium"
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
            className="!text-black justify-center !font-medium"
            column={column}
            label="Type"
          />
        ),
        cell: ({ row }) => (
          <TextCell className="whitespace-nowrap">
            {row.original.visitType}
          </TextCell>
        ),
        enableHiding: false,
      },
      {
        accessorKey: 'visitSequence',
        header: ({ column }) => (
          <ColumnHeader
            clientSideSort
            className="!text-black justify-center !font-medium"
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
            className="!text-black justify-center !font-medium"
            column={column}
            label="Medium"
          />
        ),
        cell: ({ row }) => <VisitMediumCell value={row.original.visitMedium} />,
        enableHiding: false,
      },
      {
        accessorKey: 'visitStatus',
        header: ({ column }) => (
          <ColumnHeader
            clientSideSort
            className="!text-black justify-center !font-medium"
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
            className="!text-black justify-center !font-medium"
            column={column}
            label="Ins Verification"
          />
        ),
        cell: ({ row }) => <InsuranceVerificationStatusCell row={row} />,
        enableHiding: false,
      },
    ],
  },
  {
    id: 'co-payment',
    accessorKey: 'copay',
    header: ({ column }) => (
      <ColumnHeader
        className="!text-black justify-center !font-medium"
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
            className="!text-black justify-center !font-medium"
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
            className="!text-black justify-center !font-medium"
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
        className="!text-black justify-center !font-medium"
        column={column}
        label="Co-Ins"
      />
    ),
    enableHiding: true,
    columns: [
      {
        id: 'coIns-due',
        accessorKey: 'coInsuranceDue',
        header: ({ column }) => (
          <ColumnHeader
            clientSideSort
            className="!text-black justify-center !font-medium"
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
        accessorKey: 'coInsurancePaid',
        header: ({ column }) => (
          <ColumnHeader
            clientSideSort
            className="!text-black justify-center !font-medium"
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
        className="!text-black justify-center !font-medium"
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
            className="!text-black justify-center !font-medium"
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
            className="!text-black justify-center !font-medium"
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
        className="!text-black justify-center !font-medium"
        column={column}
        label="Unit"
      />
    ),
    cell: ({ row }) => <UnitSelectCell row={row} />,
    enableHiding: true,
  },
  {
    id: 'room',
    accessorKey: 'roomResource.room',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justify-center !font-medium"
        column={column}
        label="Room"
      />
    ),
    cell: ({ row }) => <RoomSelectCell row={row} />,
    enableHiding: true,
  },
  {
    id: 'appointment-group',
    accessorKey: 'groupResource.group',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justify-center !font-medium"
        column={column}
        label="Group"
      />
    ),
    cell: ({ row }) => <GroupSelectCell row={row} />,
    enableHiding: true,
  },
  {
    id: 'date-of-admission',
    accessorKey: 'doa',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justify-center !font-medium"
        column={column}
        label="DOA"
      />
    ),
    cell: ({ row }) => (
      <TextCell
        empty={row.original.isServiceTimeDependent}
        className="whitespace-nowrap"
      >
        {row.original.dateOfAdmission
          ? formatDateCell(
              row.original.dateOfAdmission,
              row.original.locationTimezoneId,
            )
          : ''}
      </TextCell>
    ),
    enableHiding: true,
  },
  {
    id: 'length-of-stay',
    accessorKey: 'lengthOfStay',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justify-center !font-medium"
        column={column}
        label="LOS"
      />
    ),
    cell: ({ row }) => (
      <TextCell empty={row.original.isServiceTimeDependent}>
        {row.original.lengthOfStay}
      </TextCell>
    ),
    enableHiding: true,
  },
  {
    id: 'last-coverage-date',
    accessorKey: 'lastCoverageDate',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justify-center !font-medium"
        column={column}
        label="LCD"
      />
    ),
    cell: ({ row }) => (
      <TextCell
        empty={row.original.isServiceTimeDependent}
        className="whitespace-nowrap"
      >
        {row.original.lastCoverageDate}
      </TextCell>
    ),
    enableHiding: true,
  },
  {
    id: 'authorization-number',
    accessorKey: 'authorizationNumber',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justify-center !font-medium"
        column={column}
        label="Auth #"
      />
    ),
    cell: ({ row }) => (
      <TextCell empty={row.original.isServiceTimeDependent}>
        {row.original.authorizationNumber}
      </TextCell>
    ),
    enableHiding: true,
  },
  {
    id: 'legal-status',
    accessorKey: 'legalStatus',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justify-center !font-medium"
        column={column}
        label="Legal"
      />
    ),
    cell: ({ row }) => <LegalSelectCell row={row} />,
    enableHiding: true,
  },

  {
    id: 'note-signed',
    accessorKey: 'noteSignedStatus',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        className="!text-black justify-center !font-medium"
        column={column}
        label="Note Signed Status"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.noteSignedStatus}</TextCell>,
  },
  {
    id: 'actions-column',
    header: () => <ColumnHeader label="Actions" className="!font-medium" />,
    cell: ActionsCell,
  },
]

export { columns }
