import React from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { PosList } from '../types'

const columns: ColumnDef<PosList>[] = [
  {
    size: 1,
    id: 'code',
    accessorKey: 'code',
    header: ({ column }) => (
      <ColumnHeader column={column} label="POS Code" clientSideSort />
    ),
    cell: ({ row }) => <TextCell>{row.original.code}</TextCell>,
  },
  {
    maxSize: 10,
    id: 'description',
    accessorKey: 'description',
    header: ({ column }) => (
      <ColumnHeader column={column} label="Description" clientSideSort />
    ),
    cell: ({ row }) => <TextCell>{row.original.description}</TextCell>,
  },
]

const PosListTable = ({ posCodes }: { posCodes: PosList[] }) => {
  return (
    <ScrollArea>
      <DataTable
        initialPageSize={200}
        data={posCodes}
        columns={columns}
        sticky
      />
    </ScrollArea>
  )
}

export { PosListTable }
