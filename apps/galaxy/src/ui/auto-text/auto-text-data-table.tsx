'use client'

import { useEffect } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  LongTextCell,
  TextCell,
} from '@/components'
import { Sort, UserSetting } from '@/types'
import { getSortDir } from '@/utils'
import { ActionCell } from './cells'
import { useStore } from './store'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<UserSetting>[] => [
  {
    size: 80,
    id: 'name',
    header: ({ column }) => (
      <ColumnHeader
        label="Name"
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => {
          onSort?.(column.id)
        }}
      />
    ),
    cell: ({ row: { original } }) => <TextCell>{original?.name}</TextCell>,
  },
  {
    size: 500,
    id: 'content',
    header: () => <ColumnHeader label="Short" />,
    cell: ({ row: { original } }) => (
      <LongTextCell className="!line-clamp-2">{original?.content}</LongTextCell>
    ),
  },
  {
    size: 30,
    id: 'action',
    header: () => <ColumnHeader label="Action" />,
    cell: ActionCell,
  },
]

const AutoTextDataTable = () => {
  const { data, loading, fetchAutoText, sortData, sort } = useStore(
    (state) => ({
      data: state.data,
      loading: state.loading,
      fetchAutoText: state.fetchAutoText,
      sortData: state.sortData,
      sort: state.sort,
    }),
  )

  useEffect(() => {
    fetchAutoText()
  }, [fetchAutoText])

  if (loading) {
    return <LoadingPlaceholder className="h-full w-full" />
  }
  return (
    <ScrollArea className="h-full flex-1 p-2">
      <DataTable
        data={data ?? []}
        columns={columns(sort, sortData)}
        disablePagination
        theadClass="z-[1]"
        sticky
      />
    </ScrollArea>
  )
}

export { AutoTextDataTable }
