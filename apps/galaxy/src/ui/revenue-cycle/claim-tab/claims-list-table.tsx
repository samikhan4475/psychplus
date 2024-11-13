'use client'

import { useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  DateCell,
  DateTimeCell,
  LoadingPlaceholder,
  LongTextCell,
  TextCell,
} from '@/components'
import { Sort, type Claim } from '@/types'
import { getSortDir } from '@/utils'
import { formatDate, formatDateTime } from '@/utils/date'
import { getInsurancePayerName } from '../utils'
import { ActionsCell } from './actions-cell'
import { useStore } from './store'
import { ClaimNumberCell } from './table-row-claim-number-cell'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<Claim>[] => {
  return [
    {
      id: 'claimNumber',
      header: ({ column }) => (
        <ColumnHeader
          label="Claim #"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ClaimNumberCell,
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
      cell: ({ row }) => {
        return <TextCell>{row.original.patientName}</TextCell>
      },
    },
    {
      id: 'patientAccountNumber',
      header: ({ column }) => (
        <ColumnHeader
          label="Account #"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => {
        return <TextCell>{row.original.patientAccountNumber}</TextCell>
      },
    },
    {
      id: 'dateOfServiceFrom',
      header: ({ column }) => (
        <ColumnHeader
          label="DOS"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <DateCell>
          {formatDate(`${row.original.dateOfServiceFrom}`, 'MM/dd/yyyy')}
        </DateCell>
      ),
    },
    {
      id: 'primaryInsurance.payerName',
      header: ({ column }) => (
        <ColumnHeader
          label="Primary Ins."
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => {
        return (
          <TextCell>
            {getInsurancePayerName(
              'Primary',
              row.original.claimInsurancePolicies ?? [],
            )}
          </TextCell>
        )
      },
    },
    {
      id: 'secondaryInsurance.payerName',
      header: ({ column }) => (
        <ColumnHeader
          label="Secondary Ins."
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => {
        return (
          <LongTextCell>
            {getInsurancePayerName(
              'Secondary',
              row.original.claimInsurancePolicies ?? [],
            )}
          </LongTextCell>
        )
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
      cell: ({ row }) => {
        return <LongTextCell>{row.original.recordStatus}</LongTextCell>
      },
    },
    {
      id: 'totalAmount',
      header: ({ column }) => (
        <ColumnHeader
          label="Total Charge"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => {
        return <TextCell hasPayment>{row.original.totalAmount}</TextCell>
      },
    },
    {
      id: 'amountDue',
      header: ({ column }) => (
        <ColumnHeader
          label="Due Amount"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => {
        return <TextCell hasPayment>{row.original.amountDue}</TextCell>
      },
    },

    {
      id: 'createdOn',
      header: ({ column }) => (
        <ColumnHeader
          label="Created On"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => {
        return (
          <DateTimeCell>
            {formatDateTime(`${row.original.metadata?.createdOn}`)}
          </DateTimeCell>
        )
      },
    },
    {
      id: 'submittedDate',
      header: ({ column }) => (
        <ColumnHeader
          label="Submitted On"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => {
        return (
          <LongTextCell>
            {row.original.submittedDate && `${row.original.submittedDate}`}
          </LongTextCell>
        )
      },
    },
    {
      id: 'actions',
      header: () => <ColumnHeader label="Actions" />,
      cell: ({ row }) => <ActionsCell row={row} />,
    },
  ]
}

const ClaimListTable = () => {
  const {
    claimsListData,
    claimsListSearch,
    claimsListLoading,
    sort,
    sortData,
  } = useStore((state) => ({
    claimsListData: state.claimsListData,
    claimsListLoading: state.claimsListLoading,
    claimsListSearch: state.claimsListSearch,
    sort: state.sort,
    sortData: state.sortData,
  }))

  useEffect(() => {
    claimsListSearch({})
  }, [])

  if (claimsListLoading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <ScrollArea>
      <DataTable
        data={claimsListData?.claims ?? []}
        columns={columns(sort, sortData)}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { ClaimListTable }
