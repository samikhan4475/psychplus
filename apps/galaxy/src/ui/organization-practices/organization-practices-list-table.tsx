'use client'

import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell
} from '@/components'
import { Sort } from '@/types'
import { getSortDir } from '@/utils'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { Practice } from '../organization-practice/types'
import { ActionsCell } from './cells'
import { PracticesHistoryDialog } from './practices-history-dialog'
import { useStore } from './store'
import { PracticeNameCell } from './table-row-practice-name-cell'

const columns = (
  isPractices?: boolean,
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<Practice>[] =>
  [
    {
      id: 'displayName',
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
      cell: ({ row }) =>
        isPractices ? (
          <PracticeNameCell row={row} />
        ) : (
          <TextCell>{row.original.displayName}</TextCell>
        ),
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
      cell: ({ row }) => <TextCell>{row.original.npi}</TextCell>,
    },
    {
      id: 'tin',
      header: ({ column }) => (
        <ColumnHeader
          label="TIN"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.taxId}</TextCell>,
    },
    {
      id: 'taxonomy',
      header: ({ column }) => (
        <ColumnHeader
          label="Taxonomy Code"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.taxonomy}</TextCell>,
    },
    {
      id: 'clia',
      header: ({ column }) => (
        <ColumnHeader
          label="CLIA"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.clia}</TextCell>,
    },
    {
      id: 'primaryAddress',
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
      cell: ({ row }) => <TextCell>{row.original.practiceAddress?.street1 ?? ""}</TextCell>,
    },
    {
      id: 'primaryAddress2',
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
      cell: ({ row }) => <TextCell>{row.original.practiceAddress?.street2 ?? ""}</TextCell>,
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
      cell: ({ row }) => <TextCell>{row.original.practiceAddress?.city ?? ""}</TextCell>,
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
      cell: ({ row }) => <TextCell>{row.original.practiceAddress?.state ?? ""}</TextCell>,
    },
    {
      id: 'postalCode',
      header: ({ column }) => (
        <ColumnHeader
          label="ZIP"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.practiceAddress?.postalCode ?? ""}</TextCell>,
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
      cell: ({ row }) => <TextCell>{row.original.practicePhone}</TextCell>,
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
      cell: ({ row }) => <TextCell>{row.original.practiceFax}</TextCell>,
    },
    {
      id: 'payAddress',
      header: ({ column }) => (
        <ColumnHeader
          label="Pay Address"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.practicePaymentAddress?.street1 ?? ""}</TextCell>,
    },
    {
      id: 'provider',
      header: ({ column }) => (
        <ColumnHeader
          label="Default Provider"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.defaultProviderName}</TextCell>,
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
      cell: ({ row }) => (
        <PracticesHistoryDialog row={row} />
      ),
    },
    {
      id: 'actions',
      header: () => <ColumnHeader label="Actions" />,
      cell: ActionsCell,
    },
  ]

interface OrganizationPracticesListTableProps {
  isPractices?: boolean
}
const OrganizationPracticesListTable = ({ isPractices }: OrganizationPracticesListTableProps) => {
  const { id } = useParams<{ id: string }>()
  const { search, data, loading, sort, sortData } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    search: state.search,
    sort: state.sort,
    sortData: state.sortData,
  }))
  useEffect(() => {
    search({
      organizationId: id,
    })
  }, [])

  if (loading) {
    return (
      <Flex height="100%" width="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <Box className='bg-white rounded p-1 my-1'>
      <ScrollArea className='p-1 rounded'>
        <DataTable
          data={isPractices ? [] : data || []}
          columns={columns(isPractices, sort, sortData)}
          disablePagination
          sticky
          tableClass="bg-white w-[calc(100vw_-_198px)] [&_.rt-ScrollAreaRoot]:!overflow-visible"
        />
      </ScrollArea>
    </Box>
  )
}

export { OrganizationPracticesListTable }

