import { useEffect, useState } from 'react'
import { type ColumnDef } from '@tanstack/react-table'
import {
  CheckboxCell,
  ColumnHeader,
  DataTable,
  DateTimeCell,
  TextCell,
} from '@/components'
import { formatDateTime } from '@/utils'
import { AddToNoteCell, VitalStatusCell } from './cells'
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
  onCheckAddToNote: (checked: boolean, index?: number) => void,
  allChecked: boolean,
  editStatusCell: boolean,
  disabledAllChecked: boolean,
): ColumnDef<PatientVital>[] => {
  const vitalsColumns: ColumnDef<PatientVital>[] = [
    {
      id: 'vital-date-time',
      accessorKey: 'date-time',
      header: () => <ColumnHeader clientSideSort label="Date/Time" />,
      cell: ({ row }) => (
        <DateTimeCell className="whitespace-nowrap">
          {formatDateTime(
            row.original.metadata.updatedOn || row.original.metadata.createdOn,
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
      header: () => (
        <CheckboxCell
          label="Add to Note"
          className="whitespace-nowrap font-[500]"
          checked={allChecked}
          disabled={disabledAllChecked}
          onCheckedChange={(checked) => onCheckAddToNote(checked)}
        />
      ),
      cell: ({ row }) => (
        <AddToNoteCell
          checked={row.original.addToNote}
          className="ml-[-3px]"
          onCheckedChange={(checked) => onCheckAddToNote(checked, row.index)}
          disabled={row.original.recordStatus !== 'Active'}
        />
      ),
    })

  return vitalsColumns
}

const VitalsTable = ({
  data,
  showAddToNote = false,
  editStatusCell = true,
}: VitalsTableProps) => {
  const [modifiedData, setModifiedData] = useState(data)

  useEffect(() => {
    setModifiedData(data)
  }, [data])

  const handleCheckAddToNote = (checked: boolean, index?: number) => {
    setModifiedData((prevData) =>
      index === undefined
        ? prevData.map((item) =>
            item.recordStatus === 'Active'
              ? { ...item, addToNote: checked }
              : item,
          )
        : prevData.map((item, i) =>
            i === index && item.recordStatus === 'Active'
              ? { ...item, addToNote: checked }
              : item,
          ),
    )
  }

  const activeVitals = modifiedData.filter(
    (item) => item.recordStatus === 'Active',
  )
  const allChecked =
    activeVitals.length > 0 && activeVitals.every((item) => item.addToNote)

  const columns = createColumns(
    showAddToNote,
    handleCheckAddToNote,
    allChecked,
    editStatusCell,
    activeVitals.length === 0,
  )

  return (
    <DataTable data={modifiedData} columns={columns} disablePagination sticky />
  )
}

export { VitalsTable }
