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
import { ActionsCell } from './actions-cell'
import { CollapseCell } from './collapse-cell'
import { useStore } from '../response-history-tab/store'


const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<ResponseHistoryRecord>[] => {
  return [
    {
      id: 'hx',
      maxSize: 50,
      header: () => <ColumnHeader label="Hx" />,
      cell: CollapseCell,
    },
    {
      id: 'insuranceName',
      header: ({ column }) => (
        <ColumnHeader
          label="Insurance Name"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'checkNumber',
      header: ({ column }) => (
        <ColumnHeader
          label="Check Number"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'checkDate',
      header: ({ column }) => (
        <ColumnHeader
          label="Check Date"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'claimNumber',
      header: ({ column }) => (
        <ColumnHeader
          label="Claim Number"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'dateOfServiceFrom',
      header: ({ column }) => (
        <ColumnHeader
          label="Date of Service From"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'dateOfServiceTo',
      header: ({ column }) => (
        <ColumnHeader
          label="Date of Service To"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'processedAs',
      header: ({ column }) => (
        <ColumnHeader
          label="Processed as"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'denialReason',
      header: ({ column }) => (
        <ColumnHeader
          label="Denial Reason"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'icnNumber',
      header: ({ column }) => (
        <ColumnHeader
          label="ICN #"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'resolveStatus',
      header: ({ column }) => (
        <ColumnHeader
          label="Resolve Status"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'resolvedBy',
      header: ({ column }) => (
        <ColumnHeader
          label="Resolved by"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'resolvedDate',
      header: ({ column }) => (
        <ColumnHeader
          label="Resolved Date"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'action',
      header: ({ column }) => (
        <ColumnHeader
          label="Action"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ActionsCell,
    },
  ]
}

const DenialListTable = () => {
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

export { DenialListTable }
