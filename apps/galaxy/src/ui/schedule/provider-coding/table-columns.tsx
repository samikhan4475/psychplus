import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { Sort } from '@/types'
import { getSortDir } from '@/utils'
import { ProviderTypeCell, ServiceCell } from '../shared/table-cells'
import { GenderCell } from '../shared/table-cells/gender-cell'
import { formatDateCell } from '../utils'
import { PlusActionCol } from './plus-action-col'
import { GroupSelectCell, RoomSelectCell, UnitSelectCell } from './table-cells'
import { ActionsCell } from './table-cells/actions-cell'
import { CptCodeCell } from './table-cells/table-cpt-code-cell'
import { DiagnosisCodesCell } from './table-cells/table-diagnosis-cell'
import { LegalSelectCell } from './table-cells/table-legal-select-cell'
import { NoteSignedCell } from './table-cells/table-note-signed-cell'
import { TableTextCell } from './table-cells/table-text-field-cell'
import { VisitMediumSelectCell } from './table-cells/table-visit-medium-cell'
import { VisitSequenceSelectCell } from './table-cells/table-visit-select-cell'
import { VisitStatusSelectCell } from './table-cells/table-visit-status-cell'
import { ToggleVisibilityColumnHeader } from './toggle-visibility-column-header'
import { MergedRecord, WeekDay } from './types'

const generateColumns = (weekDays: WeekDay[]): ColumnDef<MergedRecord>[] => {
  return weekDays.map((day) => ({
    id: day.id,
    accessorKey: day.id,
    header: ({ column }) => (
      <ToggleVisibilityColumnHeader
        className="!text-black mx-auto justify-center !font-medium"
        column={column}
        label={day.label}
      />
    ),
    enableHiding: false,
    columns: [
      {
        accessorKey: `${day.id}.cptCodes`,
        header: ({ column }) => (
          <ColumnHeader
            className="!text-black justify-center !font-medium"
            column={column}
            label="CPT Codes"
          />
        ),
        cell: ({ row }) => <CptCodeCell row={row} day={day} />,
        enableHiding: false,
      },

      {
        accessorKey: `${day.id}.visitType`,
        header: ({ column }) => (
          <ColumnHeader
            className="!text-black justify-center !font-medium"
            column={column}
            label="Visit Type"
          />
        ),
        cell: ({ row }) => (
          <TableTextCell className="whitespace-nowrap" row={row} day={day} />
        ),
        enableHiding: true,
      },
      {
        accessorKey: `${day.id}.visitSequence`,
        header: ({ column }) => (
          <ColumnHeader
            className="!text-black justify-center !font-medium"
            column={column}
            label="Sequence"
          />
        ),
        cell: ({ row }) => <VisitSequenceSelectCell row={row} day={day} />,
        enableHiding: true,
      },
      {
        accessorKey: `${day.id}.visitMedium`,
        header: ({ column }) => (
          <ColumnHeader
            className="!text-black justify-center !font-medium"
            column={column}
            label="Medium"
          />
        ),

        cell: ({ row }) => <VisitMediumSelectCell row={row} day={day} />,
        enableHiding: true,
      },
      {
        accessorKey: `${day.id}.visitStatus`,
        header: ({ column }) => (
          <ColumnHeader
            className="!text-black justify-center !font-medium"
            column={column}
            label="Status"
          />
        ),
        cell: ({ row }) => <VisitStatusSelectCell row={row} day={day} />,
        enableHiding: true,
      },
      {
        accessorKey: `${day.id}.diagnosis`,
        header: ({ column }) => (
          <ColumnHeader
            className="!text-black justify-center !font-medium"
            column={column}
            label="Diagnosis"
          />
        ),
        cell: ({ row }) => <DiagnosisCodesCell row={row} day={day} />,
        enableHiding: true,
      },
      {
        accessorKey: `${day.id}.noteSignedStatus`,
        header: ({ column }) => (
          <ColumnHeader
            className="!text-black justify-center !font-medium"
            column={column}
            label="Note Signed Status"
          />
        ),
        cell: ({ row }) => <NoteSignedCell row={row} day={day} />,
        enableHiding: true,
      },
      {
        id: `${day.id}-actions-column`,
        header: () => <ColumnHeader label="Actions" className="!font-medium" />,
        cell: ({ row }) => <ActionsCell row={row} day={day} />,
        enableHiding: true,
      },
    ],
  }))
}
const columns = (
  currentWeekDays: WeekDay[],
  sort?: Sort,
): ColumnDef<MergedRecord>[] => {
  return [
    {
      id: 'patient-name',
      accessorKey: 'name',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justify-center !font-medium"
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
      header: ({ column, table }) => (
        <ToggleVisibilityColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justify-center !font-medium"
          column={column}
          table={table}
          label="Gender"
        />
      ),
      cell: ({ row }) => <GenderCell value={row.original.gender} />,
      enableHiding: false,
    },
    {
      id: 'date-of-birth',
      accessorKey: 'dob',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justify-center !font-medium"
          column={column}
          label="DOB"
        />
      ),
      cell: ({ row }) => (
        <TextCell className="whitespace-nowrap">{row.original.dob}</TextCell>
      ),
      enableHiding: true,
    },
    {
      id: 'facility-admission-id',
      accessorKey: 'dob',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justify-center !font-medium"
          column={column}
          label="Facility Admission ID"
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.facilityAdmissionId}</TextCell>
      ),
      enableHiding: true,
    },
    {
      id: 'location',
      accessorKey: 'locationName',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justify-center !font-medium"
          column={column}
          label="Location"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.locationName}</TextCell>,
      enableHiding: true,
    },

    {
      id: 'service',
      accessorKey: 'service',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justify-center !font-medium"
          column={column}
          label="Service"
        />
      ),
      cell: ({ row }) => <ServiceCell serviceCode={row.original.service} />,
      enableHiding: true,
    },
    {
      id: 'provider-type',
      accessorKey: 'providerType',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justify-center !font-medium"
          column={column}
          label="Provider Type"
        />
      ),
      cell: ({ row }) => <ProviderTypeCell code={row.original.providerType} />,
      enableHiding: true,
    },
    {
      id: 'unit',
      accessorKey: 'unitResource.unit',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
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
          sortable
          sortDir={getSortDir(column.id, sort)}
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
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justify-center !font-medium"
          column={column}
          label="Group"
        />
      ),
      cell: ({ row }) => <GroupSelectCell row={row} />,
      enableHiding: true,
    },
    {
      id: 'primary-insurance',
      accessorKey: 'primaryInsuranceName',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justify-center !font-medium"
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
          className="!text-black justify-center !font-medium"
          column={column}
          label="DOA"
        />
      ),
      cell: ({ row }) => (
        <TextCell className="whitespace-nowrap">
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
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justify-center !font-medium"
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
          className="!text-black justify-center !font-medium"
          column={column}
          label="LCD"
        />
      ),
      cell: ({ row }) => (
        <TextCell className="whitespace-nowrap">
          {row.original.lastCoverageDate ?? ''}
        </TextCell>
      ),
      enableHiding: true,
    },
    {
      id: 'authorization-number',
      accessorKey: 'authorizationNumber',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justify-center !font-medium"
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
          className="!text-black justify-center !font-medium"
          column={column}
          label="Legal"
        />
      ),
      cell: ({ row }) => <LegalSelectCell row={row} />,
      enableHiding: true,
    },
    ...generateColumns(currentWeekDays),
    {
      id: 'plus-actions-column',
      header: () => <PlusActionCol />,
      enableHiding: false,
    },
  ]
}

export { columns }
