'use client'

import { ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, DateTimeCell, TextCell } from '@/components'

const columns: ColumnDef<any>[] = [
  {
    id: 'pcp',
    header: () => <ColumnHeader label="PCP" />,
    cell: ({ row }) => {
      return <TextCell>{}</TextCell>
    },
  },
  {
    id: 'added-on',
    header: () => <ColumnHeader label="Added on" />,
    cell: ({ row }) => {
      return <DateTimeCell>{}</DateTimeCell>
    },
  },
  {
    id: 'Added by',
    header: () => <ColumnHeader label="Added by" />,
    cell: ({ row }) => {
      return <TextCell>{}</TextCell>
    },
  },
]

const HxTable = ({ patientId }: { patientId: string }) => {
  return (
    <ScrollArea>
      <DataTable data={[]} columns={columns} disablePagination sticky />
    </ScrollArea>
  )
}

export { HxTable }
