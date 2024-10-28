'use client'

import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { BlockContainer } from './shared'

interface Vital {
  title: string
  value: string
}
const columns: ColumnDef<Vital>[] = [
  {
    id: 'title',
    header: () => <ColumnHeader label="4/26/24 00:00" />,
    cell: ({ row: { original } }) => <TextCell>{original?.title}</TextCell>,
  },
  {
    id: 'value',
    cell: ({ row: { original } }) => <TextCell>{original?.value}</TextCell>,
  },
]
const VitalsTable = () => {
  return (
    <BlockContainer heading="Vitals">
      <ScrollArea className="max-w-[240px]">
        <DataTable columns={columns} data={data} disablePagination />
      </ScrollArea>
    </BlockContainer>
  )
}

const data: Vital[] = [
  {
    title: 'Height',
    value: '170 cm',
  },
  {
    title: 'Weight',
    value: '170 kg',
  },
  {
    title: 'BMI',
    value: '26',
  },
  {
    title: 'Temperature',
    value: '37 °C',
  },
  {
    title: 'Blood Pressure',
    value: '120/70 sys/dis',
  },
  {
    title: 'Head circumference',
    value: '55 cm',
  },
  {
    title: 'Heart Rate',
    value: '78',
  },
  {
    title: 'Respiratory Rate',
    value: '87',
  },
  {
    title: 'Pulse Oximetry',
    value: '90',
  },
  {
    title: 'O2 Concentration',
    value: '30',
  },
  {
    title: 'BMI Percentile',
    value: '28',
  },
  {
    title: 'Head Circumference Percentile',
    value: '30',
  },
  {
    title: 'Weight Length Percentile',
    value: '40',
  },
]
export { VitalsTable }
