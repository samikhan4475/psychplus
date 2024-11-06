'use client'

import { useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { Sort } from '@/types'
import { getSortDir } from '@/utils'
import { ResponseHistoryDetail } from '../../types'
import { useStore } from './store'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<ResponseHistoryDetail>[] => {
  return [
    {
      id: 'responseId',
      header: ({ column }) => (
        <ColumnHeader
          label="Response Id"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.responseId}</TextCell>,
    },
    {
      id: 'filePath',
      header: ({ column }) => (
        <ColumnHeader
          label="File Path"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.filePath}</TextCell>,
    },
    {
      id: 'fileType',
      header: ({ column }) => (
        <ColumnHeader
          label="File Type"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.fileType}</TextCell>,
    },

    {
      id: 'isProcessed',
      header: ({ column }) => (
        <ColumnHeader
          label="Processing Status"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{String(row.original.isProcessed)}</TextCell>
      ),
    },
    {
      id: 'transcationReferenceNumber',
      header: ({ column }) => (
        <ColumnHeader
          label="Transaction Reference"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.transcationReferenceNumber}</TextCell>
      ),
    },
  ]
}

const ResponseHistoryDetailTable = ({ batchId }: { batchId: string }) => {
  const { data, search, loading, sort, sortData } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    search: state.search,
    sort: state.sort,
    sortData: state.sortData,
  }))

  useEffect(() => {
    search(batchId)
  }, [])

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <ScrollArea>
      <DataTable
        data={data?.responseHistoryDetail ?? []}
        columns={columns(sort, sortData)}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { ResponseHistoryDetailTable }
