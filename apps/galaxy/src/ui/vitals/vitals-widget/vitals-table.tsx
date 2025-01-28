import { type ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, DateTimeCell, TextCell } from '@/components'
import { formatDateTime } from '@/utils'
import { AddAllToNoteCellHeader, AddToNoteCell, VitalStatusCell } from './cells'
import { UnitSystem, VITAL_TABLE_LABELS } from './constants'
import { PatientVital } from './types'
import { getVitalValue } from './utils'

interface VitalsTableProps {
  data: PatientVital[]
  showAddToNote?: boolean
  editStatusCell?: boolean
}

const createColumns = (
  showAddToNote: boolean,
  editStatusCell: boolean,
): ColumnDef<PatientVital>[] => {
  const vitalsColumns: ColumnDef<PatientVital>[] = [
    {
      id: 'vital-date-time',
      accessorKey: 'date-time',
      header: () => <ColumnHeader clientSideSort label="Date/Time" />,
      cell: ({ row }) => (
        <DateTimeCell className="whitespace-nowrap">
          {formatDateTime(
            row.original?.metadata?.updatedOn ||
              row.original?.metadata?.createdOn,
            false,
          )}
        </DateTimeCell>
      ),
    },
    {
      id: 'vital-bp',
      accessorKey: 'vital-bp',
      header: () => (
        <ColumnHeader clientSideSort sortable label="BP (sys/dia)" />
      ),
      cell: ({ row }) => (
        <TextCell>
          {getVitalValue(
            row.original,
            VITAL_TABLE_LABELS.bloodPressure,
            UnitSystem.Metric,
          )}
        </TextCell>
      ),
    },
    {
      id: 'vital-hr',
      accessorKey: 'vital-hr',
      header: () => <ColumnHeader clientSideSort sortable label="HR (bpm)" />,
      cell: ({ row }) => (
        <TextCell>
          {getVitalValue(
            row.original,
            VITAL_TABLE_LABELS.heartRate,
            UnitSystem.Metric,
          )}
        </TextCell>
      ),
    },
    {
      id: 'vital-rr',
      accessorKey: 'vital-rr',
      header: () => <ColumnHeader clientSideSort label="RR (bpm)" />,
      cell: ({ row }) => (
        <TextCell>
          {getVitalValue(
            row.original,
            VITAL_TABLE_LABELS.respiratoryRate,
            UnitSystem.Metric,
          )}
        </TextCell>
      ),
    },
    {
      id: 'vital-temp',
      accessorKey: 'vital-temp',
      header: () => <ColumnHeader clientSideSort label="Temp (C)" />,
      cell: ({ row }) => (
        <TextCell>
          {getVitalValue(
            row.original,
            VITAL_TABLE_LABELS.temperature,
            UnitSystem.Metric,
          )}
        </TextCell>
      ),
    },
    {
      id: 'vital-weight',
      accessorKey: 'vital-weight',
      header: () => <ColumnHeader clientSideSort label="Weight (kg)" />,
      cell: ({ row }) => (
        <TextCell>
          {getVitalValue(
            row.original,
            VITAL_TABLE_LABELS.weight,
            UnitSystem.Metric,
          )}
        </TextCell>
      ),
    },
    {
      id: 'vital-height',
      accessorKey: 'vital-height',
      header: () => <ColumnHeader clientSideSort label="Height (cm)" />,
      cell: ({ row }) => (
        <TextCell>
          {getVitalValue(
            row.original,
            VITAL_TABLE_LABELS.height,
            UnitSystem.Metric,
          )}
        </TextCell>
      ),
    },
    {
      id: 'vital-hc',
      accessorKey: 'vital-hc',
      header: () => <ColumnHeader clientSideSort label="HC (cm)" />,
      cell: ({ row }) => (
        <TextCell>
          {getVitalValue(
            row.original,
            VITAL_TABLE_LABELS.headCircumference,
            UnitSystem.Metric,
          )}
        </TextCell>
      ),
    },
    {
      id: 'vital-pulse-oximetry',
      accessorKey: 'vital-pulse-oximetry',
      header: () => <ColumnHeader clientSideSort label="Pulse Oximetry" />,
      cell: ({ row }) => (
        <TextCell>
          {getVitalValue(
            row.original,
            VITAL_TABLE_LABELS.pulseOximetry,
            UnitSystem.Metric,
          )}
        </TextCell>
      ),
    },
    {
      id: 'vital-oxygen-concentration',
      accessorKey: 'vital-oxygen-concentration',
      header: () => (
        <ColumnHeader clientSideSort label="Oxygen Concentration" />
      ),
      cell: ({ row }) => (
        <TextCell>
          {getVitalValue(
            row.original,
            VITAL_TABLE_LABELS.o2Concentration,
            UnitSystem.Metric,
          )}
        </TextCell>
      ),
    },
    {
      id: 'vital-bmi',
      accessorKey: 'vital-bmi',
      header: () => <ColumnHeader clientSideSort label="BMI" />,
      cell: ({ row }) => (
        <TextCell>
          {getVitalValue(
            row.original,
            VITAL_TABLE_LABELS.bmi,
            UnitSystem.Metric,
          )}
        </TextCell>
      ),
    },
    {
      id: 'vital-status',
      header: () => <ColumnHeader label="Status" />,
      cell: ({ row }) => (
        <VitalStatusCell row={row.original} editable={editStatusCell} />
      ),
    },
  ]
  if (showAddToNote)
    vitalsColumns.push({
      id: 'vitals-add-to-note',
      header: () => <AddAllToNoteCellHeader />,
      cell: ({ row }) => <AddToNoteCell row={row} />,
    })

  return vitalsColumns
}

const VitalsTable = ({
  data,
  showAddToNote = false,
  editStatusCell = true,
}: VitalsTableProps) => {
  const columns = createColumns(showAddToNote, editStatusCell)
  return <DataTable data={data} columns={columns} disablePagination sticky />
}

export { VitalsTable }
