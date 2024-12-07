'use client'

import { ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, DateTimeCell, TextCell } from '@/components'
import { formatDateTime } from '@/utils'
import { ExternalProviderDetail } from '../../types'
import { useStore } from './store'

const columns: ColumnDef<ExternalProviderDetail>[] = [
  {
    id: 'pcp',
    accessorKey: 'externalProvider.legalName.firstName',
    header: ({ column }) => (
      <ColumnHeader label="PCP" column={column} sortable clientSideSort />
    ),
    cell: ({ row }) => (
      <TextCell>
        {row?.original?.externalProvider?.legalName?.firstName}{' '}
        {row?.original?.externalProvider?.legalName?.lastName}
        {', '}
        {row?.original?.externalProvider?.legalName?.title}
      </TextCell>
    ),
  },
  {
    id: 'added-on',
    accessorKey: 'metadata.createdOn',
    header: ({ column }) => (
      <ColumnHeader label="Added on" column={column} sortable clientSideSort />
    ),
    cell: ({ row }) => (
      <DateTimeCell>
        {formatDateTime(row?.original?.metadata?.createdOn, false)}
      </DateTimeCell>
    ),
  },
  {
    id: 'Added by',
    header: ({ column }) => (
      <ColumnHeader label="Added by" column={column} sortable clientSideSort />
    ),
    cell: ({ row }) => (
      <TextCell>{row?.original?.metadata?.createdByFullName}</TextCell>
    ),
  },
]

const HxTable = () => {
  const { pcpHistory } = useStore((state) => ({
    pcpHistory: state.pcpHistory,
  }))
  return (
    <ScrollArea>
      <DataTable
        data={pcpHistory ?? []}
        columns={columns}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { HxTable }
