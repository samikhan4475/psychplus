import { ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  DateTimeCell,
  SelectCell,
  TextCell,
} from '@/components'
import { formatDateTime } from '@/utils'
import { UnitSystem, VITAL_TABLE_LABELS } from './constants'
import { PatientVital } from './types'
import { getVitalValue } from './utils'

interface VitalsTableProps {
  data: PatientVital[]
}

const columns: ColumnDef<PatientVital>[] = [
  {
    id: 'vital-date-time',
    header: () => <ColumnHeader label="Date/Time" />,
    cell: ({ row }) => (
      <DateTimeCell className="whitespace-nowrap">
        {formatDateTime(row.original.metadata.createdOn, false)}
      </DateTimeCell>
    ),
  },
  {
    id: 'vital-bp',
    header: () => <ColumnHeader label="BP (sys/dia)" />,
    cell: ({ row }) => (
      <TextCell className="whitespace-nowrap">
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
    header: () => <ColumnHeader label="HR (bpm)" />,
    cell: ({ row }) => (
      <TextCell className="whitespace-nowrap">
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
    header: () => <ColumnHeader label="RR (bpm)" />,
    cell: ({ row }) => (
      <TextCell className="whitespace-nowrap">
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
    header: () => <ColumnHeader label="Temp (C)" />,
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
    header: () => <ColumnHeader label="Weight (kg)" />,
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
    header: () => <ColumnHeader label="Height (cm)" />,
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
    header: () => <ColumnHeader label="HC (cm)" />,
    cell: ({ row }) => (
      <TextCell>
        {getVitalValue(
          row.original,
          VITAL_TABLE_LABELS.headcircumference,
          UnitSystem.Metric,
        )}
      </TextCell>
    ),
  },
  {
    id: 'vital-pulse-oximetry',
    header: () => <ColumnHeader label="Pulse Oximetry" />,
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
    header: () => <ColumnHeader label="Oxygen Concentration" />,
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
    header: () => <ColumnHeader label="BMI" />,
    cell: ({ row }) => (
      <TextCell>
        {getVitalValue(row.original, VITAL_TABLE_LABELS.bmi, UnitSystem.Metric)}
      </TextCell>
    ),
  },
  {
    id: 'vital-status',
    header: () => <ColumnHeader label="Status" />,
    cell: ({ row }) => (
      <SelectCell
        disabled
        value={row.original.recordStatus}
        options={[
          { value: 'Active', label: 'Active' },
          { value: 'Error', label: 'Error' },
        ]}
      />
    ),
  },
]

const VitalsTable = ({ data }: VitalsTableProps) => (
  <ScrollArea>
    <DataTable data={data} columns={columns} disablePagination sticky />
  </ScrollArea>
)

export { VitalsTable }
