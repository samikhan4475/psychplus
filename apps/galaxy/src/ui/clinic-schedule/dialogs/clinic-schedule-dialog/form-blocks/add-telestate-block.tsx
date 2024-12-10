import { ColumnDef } from '@tanstack/react-table'
import { useFormContext } from 'react-hook-form'
import { ColumnHeader, DataTable, LongTextCell } from '@/components'
import { BlockTableContainer } from '@/ui/clinic-schedule/shared'
import {
  AddTelestateHeader,
  CosignerSelectCell,
  DeleteTelestateCell,
  LocationSelectCell,
  RequiredColumnHeader,
} from '../cells'
import { SchemaType } from '../schema'

const columns: ColumnDef<{
  name: string
  location: string
  cosigner: string
}>[] = [
  {
    id: 'telestate',
    accessorKey: 'telestate',
    header: ({ column }) => <AddTelestateHeader />,
    cell: ({ row }) => <LongTextCell>{row.original.name}</LongTextCell>,
  },
  {
    id: 'location',
    accessorKey: 'location',
    header: ({ column }) => (
      <RequiredColumnHeader>
        <ColumnHeader column={column} label="Location" />
      </RequiredColumnHeader>
    ),
    cell: ({ row }) => <LocationSelectCell />,
  },
  {
    id: 'cosigner',
    accessorKey: 'cosigner',
    header: ({ column }) => <ColumnHeader column={column} label="Cosigner" />,
    cell: ({ row }) => <CosignerSelectCell />,
  },
  {
    id: 'delete-action-cell',
    cell: ({ row }) => <DeleteTelestateCell id={row.index} />,
  },
]

const AddTelestateBlock = () => {
  const form = useFormContext<SchemaType>()
  const telestates = form.watch('telestates')
  return (
    <BlockTableContainer>
      <DataTable
        columns={columns}
        data={telestates}
        tableClass="[&_.rt-ScrollAreaScrollbar]:!hidden"
        thClass="last-of-type:w-8"
      />
    </BlockTableContainer>
  )
}

export { AddTelestateBlock }
