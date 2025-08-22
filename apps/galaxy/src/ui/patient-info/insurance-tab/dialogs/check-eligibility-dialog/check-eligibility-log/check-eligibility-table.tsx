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
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Sort } from '@/types'
import { getStateDisplayName } from '@/ui/visits/utils'
import { formatDate, formatDateTime, getSortDir } from '@/utils'
import { ELIGIBILITY_TABLE_PAGE_SIZE } from '../constants'
import { EligibilityLogResponse } from '../types'
import { useStore } from './store'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<EligibilityLogResponse>[] => {
  return [
    {
      id: 'createdOn',
      header: ({ column }) => (
        <ColumnHeader
          label="Date/Time"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell className="truncate">
          {formatDateTime(row.original.metadata.createdOn)}
        </TextCell>
      ),
    },
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
      cell: ({ row }) => (
        <TextCell>{formatDate(row.original.serviceDate)}</TextCell>
      ),
    },
    {
      id: 'planName',
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
      cell: ({ row }) => (
        <TextCell className="truncate">{row.original.payerName}</TextCell>
      ),
    },
    {
      id: 'memberId',
      header: ({ column }) => (
        <ColumnHeader
          label="Member ID"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.memberId}</TextCell>,
    },
    {
      id: 'residingState',
      header: ({ column }) => (
        <ColumnHeader
          label="Residing State"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.residingStateCode}</TextCell>,
    },
    {
      id: 'locationName',
      header: ({ column }) => (
        <ColumnHeader
          label="Location"
          sortable
          className="min-w-[230px]"
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.locationName}</TextCell>,
    },
    {
      id: 'providerName',
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
      cell: ({ row }) => (
        <TextCell className="truncate">
          {[
            row.original.providerName?.firstName,
            row.original.providerName?.middleName,
            row.original.providerName?.lastName,
          ]
            .filter(Boolean)
            .join(', ')}
        </TextCell>
      ),
    },
    {
      id: 'serviceTypeCode',
      header: ({ column }) => (
        <ColumnHeader
          label="Service/CPT"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.serviceTypeCode}</TextCell>,
    },
    {
      id: 'createdByFullName',
      header: ({ column }) => (
        <ColumnHeader
          label="Checked By"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell className="truncate">
          {row.original.metadata.createdByFullName}
        </TextCell>
      ),
    },
    {
      id: 'coverageStatus',
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
      cell: ({ row }) => <TextCell>{row.original.responseStatus}</TextCell>,
    },
  ]
}
interface CheckEligibilityTableProps {
  patientId?: string
}
const CheckEligibilityTable = ({ patientId }: CheckEligibilityTableProps) => {
  const codes = useCodesetCodes(CODESETS.UsStates)
  const { data, search, loading, sort, sortData } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    search: state.search,
    sort: state.sort,
    sortData: state.sortData,
  }))

  useEffect(() => {
    search({ patientId }, 1, ELIGIBILITY_TABLE_PAGE_SIZE, true)
  }, [])
  if (loading)
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )

  const transformedData = data?.map((row) => ({
    ...row,
    residingStateCode: row.residingStateCode
      ? getStateDisplayName(codes, row.residingStateCode)
      : row.residingStateCode,
  })) as EligibilityLogResponse[]

  return (
    <ScrollArea className="bg-white max-w-[calc(100vw-188px)]">
      <DataTable
        tableRowClass="h-[28px]"
        data={transformedData ?? []}
        columns={columns(sort, sortData)}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { CheckEligibilityTable }
