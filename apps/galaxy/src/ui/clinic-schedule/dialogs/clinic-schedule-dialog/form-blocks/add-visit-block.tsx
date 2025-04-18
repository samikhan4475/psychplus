import { ColumnDef } from '@tanstack/react-table'
import { useFormContext } from 'react-hook-form'
import { DataTable } from '@/components'
import { BlockTableContainer } from '@/ui/clinic-schedule/shared'
import { AddVisitHeader, VisitCell } from '../cells'
import { SchemaType, visitType } from '../schema'

const columns: ColumnDef<visitType>[] = [
  {
    id: 'visit',
    accessorKey: 'visit',
    header: () => <AddVisitHeader />,
    cell: ({ row }) => (
      <VisitCell visit={row.original.visitName} id={row.index} />
    ),
  },
]

const AddVisitBlock = () => {
  const form = useFormContext<SchemaType>()
  const visits = form.watch('visitTypes')

  return (
    <BlockTableContainer flexGrow="1">
      <DataTable
        columns={columns}
        data={visits ?? []}
        tableClass="w-[100%] [&_.rt-ScrollAreaScrollbar]:!hidden"
      />
    </BlockTableContainer>
  )
}

export { AddVisitBlock }
