'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import {
  ColumnHeader,
  DataTable,
  DateCell,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { useStore as useRootStore } from '@/store'
import { SharedCode, Sort } from '@/types'
import { formatDate, getLabelFromCodeset, getSortDir } from '@/utils'
import { Practice } from '../organization-practice/types'
import { getAllOrganizationPracticesListAction } from '../organization-practices/actions'
import { ActionsCell } from './actions-cell'
import { RevalidateDateCell } from './cells/revalidate-date-cell'
import { useStore } from './store'
import { InsurancePlanItem } from './types'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
  payerTypeCodes?: SharedCode[],
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
      cell: ({ row }) => (
        <TextCell>
          {getLabelFromCodeset(row.original.planType, payerTypeCodes || [])}
        </TextCell>
      ),
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

  const [practiceInfo, setPracticeInfo] = useState<Practice>()

  const { id: practiceId } = useParams<{
    id: string
  }>()

  const payerTypeCodes = useCodesetCodes(CODESETS.PayerType)

  const addTab = useRootStore((state) => state.addTab)

  const { data, search, loading, sort, sortData } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    search: state.search,
    sort: state.sort,
    sortData: state.sortData,
  }))
  const getPracticeInfo = async () => {
    const result = await getAllOrganizationPracticesListAction({
      payload: { practiceId },
    })
    if (result.state === 'error')
      return toast.error('Failed to get practice info')

    setPracticeInfo(result.data[0])
  }
  useEffect(() => {
    if (!practiceInfo) getPracticeInfo()
    search({ practiceId }, 1)
  }, [])

  if (loading || !practiceInfo) {
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
          columns={columns(sort, sortData, payerTypeCodes)}
          disablePagination
          sticky
          onRowClick={(row) => {
            const href = `/practice-plan/${row.original.id}`
            addTab({
              href,
              label: `${row.original?.payerName} - (${practiceInfo.displayName})`,
            })
            router.push(href)
          }}
          tdClass="[&:has(.dialog-trigger-cell)]:!p-0"
          tableClass="bg-white"
        />
      </ScrollArea>
    </Box>
  )
}

export { PracticePlanListTable }
