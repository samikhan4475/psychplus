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
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { SharedCode, Sort } from '@/types'
import { getCodesetDisplayName, getSortDir } from '@/utils'
import { ActionsCell } from './cells'
import { RowStatusCell } from './cells/row-status-cell'
import { PRACTICE_PLAN_ADDRESS_TABLE_PAGE_SIZE } from './constants'
import { useStore } from './store'
import { PracticePlanAddress } from './types'

const columns = (
  stateCodes: SharedCode[],
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<PracticePlanAddress>[] => {
  return [
    {
      id: 'address.street1',
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
      cell: ({ row }) => <TextCell>{row.original.address.street1}</TextCell>,
    },
    {
      id: 'address.street2',
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
      cell: ({ row }) => <TextCell>{row.original.address.street2}</TextCell>,
    },
    {
      id: 'address.city',
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
      cell: ({ row }) => <TextCell>{row.original.address.city}</TextCell>,
    },
    {
      id: 'address.state',
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
      cell: ({ row }) => {
        const stateName = getCodesetDisplayName(
          row.original?.address.state ?? '',
          stateCodes,
        )
        return <TextCell>{stateName ?? ''}</TextCell>
      },
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
      cell: RowStatusCell,
    },
    {
      id: 'address.postalCode',
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
      cell: ({ row }) => <TextCell>{row.original.address.postalCode}</TextCell>,
    },
    {
      id: 'isDefaultLocation',
      header: ({ column }) => (
        <ColumnHeader
          label="Default Address"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.isDefaultLocation ? 'Yes' : 'No'}</TextCell>
      ),
    },
    {
      id: 'actions',
      header: () => <ColumnHeader label="Actions" />,
      cell: ActionsCell,
    },
  ]
}

const PracticePlanAddressTable = () => {
  const { id: practicePlanId } = useParams<{ id: string }>()
  const stateCodes = useCodesetCodes(CODESETS.UsStates)
  const { data, search, loading, sort, sortData } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    search: state.search,
    sort: state.sort,
    sortData: state.sortData,
  }))

  useEffect(() => {
    search(
      {
        practicePlanId,
      },
      1,
      PRACTICE_PLAN_ADDRESS_TABLE_PAGE_SIZE,
      true,
    )
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
        data={data ?? []}
        columns={columns(stateCodes, sort, sortData)}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { PracticePlanAddressTable }
