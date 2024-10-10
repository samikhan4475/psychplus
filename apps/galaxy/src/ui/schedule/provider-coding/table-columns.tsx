import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { Sort } from '@/types'
import { getSortDir } from '@/utils'
import {
  ActionsCell,
  GroupSelectCell,
  LegalSelectCell,
  RoomSelectCell,
  UnitSelectCell,
} from '../shared/table-cells'
import { ProviderCoding } from '../types'
import { ToggleVisibilityColumnHeader } from './toggle-visibility-column-header'

const columns = (sort?: Sort): ColumnDef<ProviderCoding>[] => {
  return [
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
      header: ({ column, table }) => (
        <ToggleVisibilityColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justfy-center !font-medium"
          column={column}
          table={table}
          label="Gender"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.gender}</TextCell>,
      enableHiding: false,
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
      enableHiding: true,
    },
    {
      id: 'facility-admission-id',
      accessorKey: 'dob',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Facility Admission ID"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.facilityAdmissionId}</TextCell>,
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
      enableHiding: true,
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
      enableHiding: true,
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
      enableHiding: true,
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
      enableHiding: true,
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
      enableHiding: true,
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
      enableHiding: true,
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
      enableHiding: true,
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
      enableHiding: true,
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
      enableHiding: true,
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
      cell: ({ row }) => (
        <TextCell>{row.original.legalStatus}</TextCell>
      ), //<LegalSelectCell />,
      enableHiding: true,
    },
    {
      id: 'date-range',
      accessorKey: 'date-range',
      header: ({ column }) => (
        <ToggleVisibilityColumnHeader
          className="!text-black justfy-center mx-auto !font-medium"
          column={column}
          label="Wed 04/16"
        />
      ),
      enableHiding: false,
      columns: [
        {
          accessorKey: 'cptCodes',
          header: ({ column }) => (
            <ColumnHeader
              className="!text-black justfy-center !font-medium"
              column={column}
              label="CPT Codes"
            />
          ),
          cell: ({ row }) => <TextCell>{row.original.cptCodes}</TextCell>,
          enableHiding: false,
        },
        {
          accessorKey: 'visitType',
          header: ({ column }) => (
            <ColumnHeader
              className="!text-black justfy-center !font-medium"
              column={column}
              label="Visit Type"
            />
          ),
          cell: ({ row }) => <TextCell>{row.original.visitType}</TextCell>,
          enableHiding: true,
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
          cell: ({ row }) => <TextCell>{row.original.visitSequence}</TextCell>,
          enableHiding: true,
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
          enableHiding: true,
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
          cell: ({ row }) => <TextCell>{row.original.visitStatus}</TextCell>,
          enableHiding: true,
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
          enableHiding: true,
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
          cell: ({ row }) => <TextCell>{row.original.isNoteSigned}</TextCell>,
          enableHiding: true,
        },
      ],
    },
    {
      id: 'actions-column',
      header: () => <ColumnHeader label="Actions" className="!font-medium" />,
      cell: ({ row }) => <ActionsCell />,
      enableHiding: false,
    },
  ]
}

export { columns }
