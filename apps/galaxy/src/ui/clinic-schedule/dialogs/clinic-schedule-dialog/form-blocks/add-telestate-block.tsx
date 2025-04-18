import { ColumnDef } from '@tanstack/react-table'
import { useFormContext } from 'react-hook-form'
import { ColumnHeader, DataTable } from '@/components'
import { BlockTableContainer, StateCell } from '@/ui/clinic-schedule/shared'
import {
  AddTelestateHeader,
  CosignerSelectCell,
  DeleteTelestateCell,
  LocationSelectCell,
  RequiredColumnHeader,
} from '../cells'
import { SchemaType } from '../schema'

const columns: ColumnDef<{
  stateCode: string
  location: string
  cosignerStaffId?: number
}>[] = [
  {
    id: 'telestate',
    accessorKey: 'telestate',
    header: () => <AddTelestateHeader />,
    cell: ({ row }) => <StateCell code={row.original.stateCode} />,
  },
  {
    id: 'location',
    accessorKey: 'location',
    header: ({ column }) => (
      <RequiredColumnHeader>
        <ColumnHeader column={column} label="Location" />
      </RequiredColumnHeader>
    ),
    cell: ({ row }) => <LocationSelectCell index={row.index} />,
  },
  {
    id: 'cosigner',
    accessorKey: 'cosigner',
    header: ({ column }) => <ColumnHeader column={column} label="Cosigner" />,
    cell: ({ row }) => <CosignerSelectCell index={row.index} />,
  },
  {
    id: 'delete-action-cell',
    cell: ({ row }) => <DeleteTelestateCell id={row.index} />,
  },
]

const AddTelestateBlock = () => {
  const form = useFormContext<SchemaType>()
  const telestates = form.watch('teleStates')
  return (
    <BlockTableContainer>
      <DataTable
        columns={columns}
        data={telestates ?? []}
        tableClass="[&_.rt-ScrollAreaScrollbar]:!hidden"
        thClass="last-of-type:w-8"
      />
    </BlockTableContainer>
  )
}

export { AddTelestateBlock }
