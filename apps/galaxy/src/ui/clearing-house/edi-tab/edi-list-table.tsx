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
import { EdiItem } from '../types'
import { ActionsCell } from './actions-cell'
import { useStore } from './store'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<EdiItem>[] => {
  return [
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
      id: 'payerName',
      header: ({ column }) => (
        <ColumnHeader
          label="Insurance Plan Name"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.insurancePayerName}</TextCell>,
    },
    {
      id: 'payerId',
      header: ({ column }) => (
        <ColumnHeader
          label="Payer ID"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.payerId}</TextCell>,
    },
    {
      id: 'isEligibility',
      header: ({ column }) => (
        <ColumnHeader
          label="Eligibility"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.isEligibility ? 'Yes' : 'No'}</TextCell>
      ),
    },

    {
      id: 'isElectronic',
      header: ({ column }) => (
        <ColumnHeader
          label="Electronic Pro."
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.isElectronic ? 'Yes' : 'No'}</TextCell>
      ),
    },

    {
      id: 'isInstitutional',
      header: ({ column }) => (
        <ColumnHeader
          label="Electronic Inst."
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.isInstitutional ? 'Yes' : 'No'}</TextCell>
      ),
    },

    {
      id: 'isDental',
      header: ({ column }) => (
        <ColumnHeader
          label="Electronic Dental"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.isDental ? 'Yes' : 'No'}</TextCell>
      ),
    },

    {
      id: 'isPaperCms1500',
      header: ({ column }) => (
        <ColumnHeader
          label="Paper (CMS-1500)"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.isPaperCms1500 ? 'Yes' : 'No'}</TextCell>
      ),
    },

    {
      id: 'isPaperUb04',
      header: ({ column }) => (
        <ColumnHeader
          label="Paper (UB04)"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.isPaperUb04 ? 'Yes' : 'No'}</TextCell>
      ),
    },
    {
      id: 'actions',
      header: () => <ColumnHeader label="Actions" />,
      cell: ({ row }) => <ActionsCell row={row} />,
    },
  ]
}

const EdiListTable = () => {
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
        data={data?.ediList ?? []}
        columns={columns(sort, sortData)}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { EdiListTable }
