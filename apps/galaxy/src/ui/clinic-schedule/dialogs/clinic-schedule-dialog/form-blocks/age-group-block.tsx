import { ColumnDef } from '@tanstack/react-table'
import { useFormContext } from 'react-hook-form'
import { DataTable } from '@/components'
import { BlockTableContainer } from '@/ui/clinic-schedule/shared'
import { AgeGroupCell } from '../cells'
import { SchemaType } from '../schema'
import { AddAgeGroupHeader } from '../cells'

const columns: ColumnDef<{ group: string }>[] = [
  {
    id: 'group',
    accessorKey: 'group',
    header: ({ column }) => <AddAgeGroupHeader />,
    cell: ({ row }) => (
      <AgeGroupCell group={row.original.group} id={row.index} />
    ),
  },
]

const AgeGroupBlock = () => {
  const form = useFormContext<SchemaType>()
  const groups = form.watch('groups')

  return (
    <BlockTableContainer flexGrow='1'>
      <DataTable
        columns={columns}
        data={groups}
        tableClass="w-[100%] [&_.rt-ScrollAreaScrollbar]:!hidden"
      />
    </BlockTableContainer>
  )
}

export { AgeGroupBlock }
