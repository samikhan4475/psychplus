import { ColumnDef } from '@tanstack/react-table'
import { useFormContext } from 'react-hook-form'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { SpravatoWidgetSchemaType } from '../../spravato-widget-schema'
import { BloodPressureCell } from './blood-pressure-cell'

interface Vital {
  pulseOximetry?: string
  vitalSignDateTime?: string
  systolic?: string
  diastolic?: string
  heartRate?: string
  respiratoryRate?: string
}
const columns: ColumnDef<Vital>[] = [
  {
    id: 'dateTime',
    header: () => <ColumnHeader label="Date/Time" clientSideSort />,
    cell: ({ row: { original } }) => (
      <TextCell>{original?.vitalSignDateTime}</TextCell>
    ),
  },
  {
    id: 'bp',
    header: () => <ColumnHeader label="BP (sys/dia)" clientSideSort />,
    cell: ({ row: { original } }) => (
      <BloodPressureCell
        systolic={original?.systolic ?? ''}
        diastolic={original?.diastolic ?? ''}
      />
    ),
  },
  {
    id: 'hr',
    header: () => <ColumnHeader label="HR (bpm)" clientSideSort />,
    cell: ({ row: { original } }) => (
      <TextCell>{`${original?.heartRate} bpm`}</TextCell>
    ),
  },
  {
    id: 'rr',
    header: () => <ColumnHeader label="RR (bpm)" clientSideSort />,
    cell: ({ row: { original } }) => (
      <TextCell>{`${original?.respiratoryRate} bpm`}</TextCell>
    ),
  },
  {
    id: 'pulseOximetry',
    header: () => <ColumnHeader label="Pulse Oximetry" clientSideSort />,
    cell: ({ row: { original } }) => (
      <TextCell>{original?.pulseOximetry}</TextCell>
    ),
  },
]

const VitalSignsTable = () => {
  const form = useFormContext<SpravatoWidgetSchemaType>()

  const vitalSigns = form.watch('vitalSigns')

  return (
    <DataTable data={vitalSigns} columns={columns} disablePagination sticky />
  )
}

export { VitalSignsTable }
