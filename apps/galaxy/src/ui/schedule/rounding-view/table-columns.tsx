import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { Sort } from '@/types'
import { getSortDir } from '@/utils'
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
import { Appointment } from '../types'

const columns = (sort?: Sort): ColumnDef<Appointment>[] => {
  return [
    {
      id: 'date-header',
      accessorKey: 'appointmentDate',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Date"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.appointmentDate}</TextCell>,
      enableHiding: false,
    },
    {
      id: 'patient-name',
      accessorKey: 'name',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Name"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.name}</TextCell>,
      enableHiding: false,
    },
    {
      id: 'age',
      accessorKey: 'age',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
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
          sortable
          sortDir={getSortDir(column.id, sort)}
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
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justfy-center !font-medium"
          column={column}
          label="DOB"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.dob}</TextCell>,
    },
    {
      id: 'patient-status',
      accessorKey: 'patientStatus',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
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
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Location"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.clinicLocation}</TextCell>,
    },

    {
      id: 'service',
      accessorKey: 'service',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Service"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.service}</TextCell>,
    },
    {
      id: 'provider-type',
      accessorKey: 'providerType',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
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
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Unit"
        />
      ),
      cell: ({ row }) => <UnitSelectCell />,
    },
    {
      id: 'room',
      accessorKey: 'room',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
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
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Group"
        />
      ),
      cell: ({ row }) => <GroupSelectCell />,
    },
    {
      id: 'primary-insurance',
      accessorKey: 'primaryInsuranceName',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Primary Insurance"
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.primaryInsuranceName}</TextCell>
      ),
      enableHiding: true,
    },
    {
      id: 'secondary-insurance',
      accessorKey: 'secondaryInsuranceName',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
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
              sortable
              sortDir={getSortDir(column.id, sort)}
              className="!text-black justfy-center !font-medium"
              column={column}
              label="Type"
            />
          ),
          cell: ({ row }) => <TextCell>{row.original.visitType}</TextCell>,
          enableHiding: false,
        },
        {
          accessorKey: 'visitSequence',
          header: ({ column }) => (
            <ColumnHeader
              sortable
              sortDir={getSortDir(column.id, sort)}
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
              sortable
              sortDir={getSortDir(column.id, sort)}
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
              sortable
              sortDir={getSortDir(column.id, sort)}
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
              sortable
              sortDir={getSortDir(column.id, sort)}
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
      id: 'diagnosis',
      accessorKey: 'diagnosis',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Diagnosis"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.diagnosis}</TextCell>,
      enableHiding: false,
    },
    {
      id: 'cpt-code',
      accessorKey: 'cptCodes',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
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
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justfy-center !font-medium"
          column={column}
          label="DOA"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.dateOfAddmission}</TextCell>,
      enableHiding: false,
    },
    {
      id: 'length-of-stay',
      accessorKey: 'lengthOfStay',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
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
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justfy-center !font-medium"
          column={column}
          label="LCD"
        />
      ),
      cell: ({ row }) => <TextCell>{'Missing'}</TextCell>,
      enableHiding: false,
    },
    {
      id: 'authorization-number',
      accessorKey: 'authorizationNumber',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Auth #"
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.authorizationNumber}</TextCell>
      ),
      enableHiding: true,
    },
    {
      id: 'legal-status',
      accessorKey: 'legalStatus',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Legal"
        />
      ),
      cell: ({ row }) => <LegalSelectCell />,
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
              sortable
              sortDir={getSortDir(column.id, sort)}
              className="!text-black justfy-center !font-medium"
              column={column}
              label="Due"
            />
          ),
          cell: ({ row }) => <TextCell>{row.original.copayDue}</TextCell>,
          enableHiding: true,
        },
        {
          id: 'copay-paid',
          accessorKey: 'copayPaid',
          header: ({ column }) => (
            <ColumnHeader
              sortable
              sortDir={getSortDir(column.id, sort)}
              className="!text-black justfy-center !font-medium"
              column={column}
              label="Paid"
            />
          ),
          cell: ({ row }) => <TextCell>{row.original.copayPaid}</TextCell>,
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
              sortable
              sortDir={getSortDir(column.id, sort)}
              className="!text-black justfy-center !font-medium"
              column={column}
              label="Due"
            />
          ),
          cell: ({ row }) => <TextCell>{row.original.coInsuranceDue}</TextCell>,
        },
        {
          id: 'coIns-paid',
          accessorKey: 'copayPaid',
          header: ({ column }) => (
            <ColumnHeader
              sortable
              sortDir={getSortDir(column.id, sort)}
              className="!text-black justfy-center !font-medium"
              column={column}
              label="Paid"
            />
          ),
          cell: ({ row }) => (
            <TextCell>{row.original.coInsurancePaid}</TextCell>
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
              sortable
              sortDir={getSortDir(column.id, sort)}
              className="!text-black justfy-center !font-medium"
              column={column}
              label="Due"
            />
          ),
          cell: ({ row }) => <TextCell>{row.original.balanceDue}</TextCell>,
        },
        {
          id: 'balance-paid',
          accessorKey: 'balancePaid',
          header: ({ column }) => (
            <ColumnHeader
              sortable
              sortDir={getSortDir(column.id, sort)}
              className="!text-black justfy-center !font-medium"
              column={column}
              label="Paid"
            />
          ),
          cell: ({ row }) => <TextCell>{row.original.balancePaid}</TextCell>,
        },
      ],
    },
    {
      id: 'note-signed',
      accessorKey: 'isNoteSigned',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
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
}

export { columns }
