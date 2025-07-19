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
import { useStore } from './store'
import { EligibilityDetailResponseModel } from './types'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<EligibilityDetailResponseModel>[] => {
  return [
    {
      id: 'serviceDate',
      header: ({ column }) => (
        <ColumnHeader
          label="Service Date"
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
      id: 'patientName',
      header: ({ column }) => (
        <ColumnHeader
          label="Patient Name"
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
      id: 'policyNumber',
      header: ({ column }) => (
        <ColumnHeader
          label="Policy Number"
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
      id: 'payer',
      header: ({ column }) => (
        <ColumnHeader
          label="Payer"
          sortable
          className='min-w-[230px]'
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'provider',
      header: ({ column }) => (
        <ColumnHeader
          label="Provider"
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
      id: 'requestedBy',
      header: ({ column }) => (
        <ColumnHeader
          label="Requested By"
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
          label="Status"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
  ]
}

const CheckEligibilityTable = () => {
  const { data, search, loading, sort, sortData } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    search: state.search,
    sort: state.sort,
    sortData: state.sortData,
  }))

  useEffect(() => {
    search({}, 1, 20, true)
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
        tableRowClass="h-[28px]"
        data={data ? [data] : []}
        columns={columns(sort, sortData)}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { CheckEligibilityTable }
