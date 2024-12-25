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
import { ResponseHistoryRecord } from '../types'
import { useStore } from './store'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<ResponseHistoryRecord>[] => {
  return [
    {
      id: 'practiceName',
      header: ({ column }) => (
        <ColumnHeader
          label="Practice Name"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.practiceName}</TextCell>,
    },
    {
      id: 'receiverName',
      header: ({ column }) => (
        <ColumnHeader
          label="Receiver Name"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.receiverName}</TextCell>,
    },
    {
      id: 'submitterName',
      header: ({ column }) => (
        <ColumnHeader
          label="Submitter Name"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.submitterName}</TextCell>,
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
      id: 'transcationReferenceNumber',
      header: ({ column }) => (
        <ColumnHeader
          label="Trans Reference Number"
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
    {
      id: 'isManualImport',
      header: ({ column }) => (
        <ColumnHeader
          label="Manual Import"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{String(row.original.isManualImport)}</TextCell>
      ),
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
      id: 'isCheckAlreadyExists',
      header: ({ column }) => (
        <ColumnHeader
          label="Check Already Exists"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{String(row.original.isCheckAlreadyExists)}</TextCell>
      ),
    },
    {
      id: 'recordStatus',
      header: ({ column }) => (
        <ColumnHeader
          label="Status"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.recordStatus}</TextCell>,
    },
  ]
}

const ResponseHistoryListTable = () => {
  const { data, search, loading, sort, sortData } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    search: state.search,
    sort: state.sort,
    sortData: state.sortData,
  }))

  useEffect(() => {
    search({})
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
        data={data?.responseHistory ?? []}
        columns={columns(sort, sortData)}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { ResponseHistoryListTable }
