'use client'

import { ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { ActionsCell } from '@/ui/assigning-authorities/cells'
import { useStore } from '@/ui/assigning-authorities/store'
import { AssigningAuthority } from '@/ui/assigning-authorities/types'

const AssigningAuthoritiesTable = () => {
  const { assigningAuthorities, loading } = useStore((state) => ({
    assigningAuthorities: state.assigningAuthorities,
    loading: state.loading,
  }))

  if (loading) return <LoadingPlaceholder className="bg-white" />

  return (
    <DataTable
      columns={columns}
      data={assigningAuthorities ?? []}
      isRowSpan
      sticky
    />
  )
}

const columns: ColumnDef<AssigningAuthority>[] = [
  {
    accessorKey: 'displayName',
    size: 300,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        clientSideSort
        label="Assigning Authorities"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original?.displayName ?? ''}</TextCell>,
  },
  {
    accessorKey: 'namespace',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="NameSpace" />
    ),
    cell: ({ row }) => <TextCell>{row.original?.namespace ?? ''}</TextCell>,
  },
  {
    accessorKey: 'oid',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="OID" />
    ),
    cell: ({ row }) => <TextCell>{row.original.oid ?? ''}</TextCell>,
  },
  {
    id: 'actions',
    size: 40,
    header: () => <ColumnHeader label="Actions" className="!font-medium" />,
    cell: ActionsCell,
  },
]

export { AssigningAuthoritiesTable }
