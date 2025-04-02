'use client'

import { useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  DateCell,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Sort, type Claim } from '@/types'
import { getSortDir } from '@/utils'
import { formatDate } from '@/utils/date'
import { CLAIM_STATUSES } from '../../constants'
import { ClaimNumberCell } from './claim-number-cell'
import { useStore } from './store'
import { transformInClaims } from './utils'

const columns = (
  handlePaymentPostingClaim: (claim: Claim) => void,
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
      cell: ({ row }) => (
        <ClaimNumberCell
          handlePaymentPostingClaim={handlePaymentPostingClaim}
          row={row}
        />
      ),
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
      cell: ({ row }) =>
        row.original.dateOfServiceFrom && (
          <DateCell>
            {formatDate(`${row.original.dateOfServiceFrom}`, 'MM/dd/yyyy')}
          </DateCell>
        ),
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
      cell: ({ row }) => <TextCell>{row.original.patientName}</TextCell>,
    },
    {
      id: 'patientDateOfBirth',
      header: ({ column }) => (
        <ColumnHeader
          label="DOB"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <DateCell>
          {formatDate(row.original.patientDateOfBirth, 'MM/dd/yyyy')}
        </DateCell>
      ),
    },
    {
      id: 'billedAmount',
      header: ({ column }) => (
        <ColumnHeader
          label="Billed Amount"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell hasPayment>{row.original.totalAmount}</TextCell>
      ),
    },
    {
      id: 'claimStatusCode',
      header: ({ column }) => (
        <ColumnHeader
          label="Claim Status"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.claimStatusCode}</TextCell>,
    },
  ]
}

const ClaimListTable = ({
  handlePaymentPostingClaim,
}: {
  handlePaymentPostingClaim: (claim: Claim) => void
}) => {
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

  const claimStatusCodes = useCodesetCodes(CODESETS.ClaimStatus)
  useEffect(() => {
    claimsListSearch({
      claimStatusCodes: CLAIM_STATUSES,
    })
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
        data={transformInClaims(claimStatusCodes, claimsListData?.claims ?? [])}
        columns={columns(handlePaymentPostingClaim, sort, sortData)}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { ClaimListTable }
