import { Box, ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { FieldArrayWithId, useFieldArray } from 'react-hook-form'
import { ColumnHeader, DataTable } from '@/components'
import { SchemaType } from '../schema'
import { CPTCodesCell } from './cell/cpt-codes-cell'
import { DurationCell } from './cell/duration-cell'
import { VisitMediumCell } from './cell/visit-medium-cell'
import { VisitNoteTitleCell } from './cell/visit-note-title-cell'
import { VisitSequenceCell } from './cell/visit-sequence-cell'
import { VisitTypeCell } from './cell/visit-type-cell'

const columns: ColumnDef<FieldArrayWithId<SchemaType, 'visitTypes'>>[] = [
  {
    id: 'visitTypeCode',
    accessorKey: 'visitTypeCode',
    header: ({ column }) => <ColumnHeader column={column} label="Visit Type" />,
    cell: ({ row }) => <VisitTypeCell row={row} />,
  },
  {
    id: 'visitSequence',
    accessorKey: 'visitSequence',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Visit Sequence" />
    ),
    cell: ({ row }) => <VisitSequenceCell row={row} />,
  },
  {
    id: 'visitMedium',
    accessorKey: 'visitMedium',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Visit Medium" />
    ),
    cell: ({ row }) => <VisitMediumCell row={row} />,
  },
  {
    id: 'visitNoteTitle',
    accessorKey: 'visitNoteTitle',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Visit Title" />
    ),
    cell: ({ row }) => <VisitNoteTitleCell row={row} />,
  },
  {
    id: 'defaultDuration',
    accessorKey: 'defaultDuration',
    header: ({ column }) => <ColumnHeader column={column} label="Duration" />,
    cell: ({ row }) => <DurationCell row={row} />,
  },
  {
    id: 'cptPrimaryCodes',
    accessorKey: 'cptPrimaryCodes',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Primary Cpt Codes" />
    ),
    cell: ({ row }) => <CPTCodesCell row={row} />,
  },
]

const VisitSettingsTable = () => {
  const { fields } = useFieldArray<SchemaType, 'visitTypes'>({
    name: 'visitTypes',
  })

  return (
    <Box p="2" className="bg-white mt-[3px]">
      <ScrollArea
        scrollbars="horizontal"
        className="w-full max-w-[calc(100vw_-_210px)]"
      >
        <DataTable columns={columns} data={fields} tdClass="p-0" isRowSpan />
      </ScrollArea>
    </Box>
  )
}

export { VisitSettingsTable }
