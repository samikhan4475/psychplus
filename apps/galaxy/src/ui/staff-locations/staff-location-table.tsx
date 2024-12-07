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
import { useStore } from '../staff-management/store'
import { Staff } from '../staff-management/types'
import { StatusCell } from './cells'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<Staff>[] => {
  return [
    {
      id: 'firstName',
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
      cell: ({ row }) => (
        <TextCell>{row.original.legalName?.firstName}</TextCell>
      ),
    },
    {
      id: 'lastName',
      header: ({ column }) => (
        <ColumnHeader
          label="Type"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.legalName?.lastName}</TextCell>
      ),
    },
    {
      id: 'noindex',
      header: ({ column }) => (
        <ColumnHeader
          label="Region"
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
      id: 'noindex',
      header: ({ column }) => (
        <ColumnHeader
          label="NPI"
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
      id: 'noindex',
      header: ({ column }) => (
        <ColumnHeader
          label="SPI"
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
      id: 'noindex',
      header: ({ column }) => (
        <ColumnHeader
          label="Address"
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
      id: 'noindex',
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
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'noindex',
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
      cell: ({ row }) => <TextCell>--</TextCell>,
    },

    {
      id: 'status',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          label="Status"
        />
      ),
      cell: StatusCell,
    },
  ]
}

const StaffLocationTable = () => {
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
    <ScrollArea className="bg-white max-w-[calc(100vw-188px)]">
      <DataTable
        data={data?.staff ?? []}
        columns={columns(sort, sortData)}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { StaffLocationTable }
