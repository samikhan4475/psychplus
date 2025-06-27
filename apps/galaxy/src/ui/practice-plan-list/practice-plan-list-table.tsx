'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  DateCell,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { useStore as useRootStore } from '@/store'
import { Sort } from '@/types'
import { formatDate, getSortDir } from '@/utils'
import { ActionsCell } from './actions-cell'
import { RevalidateDateCell } from './cells/revalidate-date-cell'
import { useStore } from './store'
import { InsurancePlanItem } from './types'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<InsurancePlanItem>[] => {
  return [
    {
      id: 'payerName',
      header: ({ column }) => (
        <ColumnHeader
          label="Payer"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.payerName}</TextCell>,
    },
    {
      id: 'insurancePlanName',
      header: ({ column }) => (
        <ColumnHeader
          label="Plan"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.insurancePlanName}</TextCell>,
    },
    {
      id: 'planType',
      header: ({ column }) => (
        <ColumnHeader
          label="Plan Type"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.planType}</TextCell>,
    },
    {
      id: 'planStatus',
      header: ({ column }) => (
        <ColumnHeader
          label="Plan Status"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.planStatus ? 'Active' : 'Inactive'}</TextCell>
      ),
    },
    {
      id: 'networkStatus',
      header: ({ column }) => (
        <ColumnHeader
          label="Network Status"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.networkStatus}</TextCell>,
    },
    {
      id: 'effectiveDate',
      header: ({ column }) => (
        <ColumnHeader
          label="Effective Date"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) =>
        row.original.effectiveDate && (
          <DateCell>
            {formatDate(`${row.original.effectiveDate}`, 'MM/dd/yyyy')}
          </DateCell>
        ),
    },
    {
      id: 'isRevalidationRequired',
      header: ({ column }) => (
        <ColumnHeader
          label="Re-valid/cred Date Req."
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>
          {row.original.isRevalidationRequired ? 'Yes' : 'No'}
        </TextCell>
      ),
    },
    {
      id: 'revalidationDate',
      header: ({ column }) => (
        <ColumnHeader
          label="Re-valid/cred Date"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: RevalidateDateCell,
    },
    {
      id: 'isProviderRevalidationRequired',
      header: ({ column }) => (
        <ColumnHeader
          label="Provider Revalidation Req"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>
          {row.original.isProviderRevalidationRequired ? 'Yes' : 'No'}
        </TextCell>
      ),
    },
    {
      id: 'actions',
      header: () => <ColumnHeader label="Actions" />,
      cell: ActionsCell,
    },
  ]
}
const PracticePlanListTable = () => {
  const router = useRouter()
  const { data, search, loading, sort, sortData } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    search: state.search,
    sort: state.sort,
    sortData: state.sortData,
  }))

  const addTab = useRootStore((state) => state.addTab)
  useEffect(() => {
    search({}, 1)
  }, [])

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <Box className="bg-white rounded my-1 p-1">
      <ScrollArea className="rounded p-1">
        <DataTable
          data={data?.insurancePlanList ?? []}
          columns={columns(sort, sortData)}
          disablePagination
          sticky
          onRowClick={(row) => {
            const href = `/practice-plan/${row.original.id}`
            addTab({
              href,
              label: `${row.original?.payerName}`,
            })
            router.push(href)
          }}
          tableClass="bg-white "
        />
      </ScrollArea>
    </Box>
  )
}

export { PracticePlanListTable }
