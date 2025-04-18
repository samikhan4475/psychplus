import { ColumnDef } from '@tanstack/react-table'
import { useFormContext } from 'react-hook-form'
import { DataTable } from '@/components'
import { BlockTableContainer } from '@/ui/clinic-schedule/shared'
import { AddAgeGroupHeader, AgeGroupCell } from '../cells'
import { SchemaType } from '../schema'

const columns: ColumnDef<string>[] = [
  {
    id: 'group',
    accessorKey: 'group',
    header: () => <AddAgeGroupHeader />,
    cell: ({ row }) => <AgeGroupCell group={row.original} id={row.index} />,
  },
]

const AgeGroupBlock = () => {
  const form = useFormContext<SchemaType>()
  const groups = form.watch('groups')

  return (
    <BlockTableContainer flexGrow="1">
      <DataTable
        columns={columns}
        data={groups}
        tableClass="w-[100%] [&_.rt-ScrollAreaScrollbar]:!hidden"
      />
    </BlockTableContainer>
  )
}

export { AgeGroupBlock }
