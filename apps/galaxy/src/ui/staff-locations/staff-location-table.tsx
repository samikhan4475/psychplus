'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
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
import { StatusCell } from './cells'
import { useStore } from './store'
import { StaffLocation } from './types'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<StaffLocation>[] => {
  return [
    {
      id: 'locationName',
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
      cell: ({ row }) => <TextCell>{row.original.location?.name}</TextCell>,
    },
    {
      id: 'type',
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
        <TextCell>{row.original?.location?.locationType}</TextCell>
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
      id: 'npi',
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
      cell: ({ row }) => <TextCell>{row.original.location?.npi}</TextCell>,
    },
    {
      id: 'externalProviderId',
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
      cell: ({ row }) => <TextCell>{row.original.externalProviderId}</TextCell>,
    },
    {
      id: 'address',
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
      cell: ({ row }) => {
        if (row.original?.location?.address) {
          const { street1, street2, postalCode } = row.original.location.address
          return (
            <TextCell className="w-[240px]">{`${street1 ?? ''}, ${
              street2 ?? ''
            }, ${postalCode ?? ''}`}</TextCell>
          )
        }
      },
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
      cell: ({ row }) => (
        <TextCell>{row.original.location?.phone?.number}</TextCell>
      ),
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
      cell: ({ row }) => (
        <TextCell>{row.original.location?.fax?.number}</TextCell>
      ),
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
  const { id } = useParams()

  useEffect(() => {
    if (id && typeof id === 'string') search({ staffId: id })
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
        data={data?.staffLocations ?? []}
        columns={columns(sort, sortData)}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { StaffLocationTable }
