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
import { ClearingHouseSubmitter } from '../types'
import { ActionsCell } from './actions-cell'
import { StateNameCell } from './state-name-cell'
import { useStore } from './store'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<ClearingHouseSubmitter>[] => {
  return [
    {
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
      cell: ({ row }) => <TextCell>{row.original.name}</TextCell>,
    },
    {
      id: 'username',
      header: ({ column }) => (
        <ColumnHeader
          label="User Name"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.username}</TextCell>,
    },
    {
      id: 'email',
      header: ({ column }) => (
        <ColumnHeader
          label="email"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.email}</TextCell>,
    },
    {
      id: 'submitterId',
      header: ({ column }) => (
        <ColumnHeader
          label="Submitter Id"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.submitterId}</TextCell>,
    },

    {
      id: 'addressLine1',
      header: ({ column }) => (
        <ColumnHeader
          label="Address 1"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.addressLine1}</TextCell>,
    },

    {
      id: 'addressLine2',
      header: ({ column }) => (
        <ColumnHeader
          label="Address 2"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.addressLine2}</TextCell>,
    },

    {
      id: 'city',
      header: ({ column }) => (
        <ColumnHeader
          label="City"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.city}</TextCell>,
    },

    {
      id: 'state',
      header: ({ column }) => (
        <ColumnHeader
          label="State"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <StateNameCell row={row} />,
    },

    {
      id: 'zip',
      header: ({ column }) => (
        <ColumnHeader
          label="Zip"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.zip}</TextCell>,
    },

    {
      id: 'contactPerson',
      header: ({ column }) => (
        <ColumnHeader
          label="Contact Person"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.contactPerson}</TextCell>,
    },

    {
      id: 'phone',
      header: ({ column }) => (
        <ColumnHeader
          label="Phone"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.phone}</TextCell>,
    },

    {
      id: 'fax',
      header: ({ column }) => (
        <ColumnHeader
          label="Fax"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.fax}</TextCell>,
    },
    {
      id: 'actions',
      header: () => <ColumnHeader label="Actions" />,
      cell: ({ row }) => <ActionsCell row={row} />,
    },
  ]
}

const InsurancePaymentListTable = () => {
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
        data={data?.submitters ?? []}
        columns={columns(sort, sortData)}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { InsurancePaymentListTable }
