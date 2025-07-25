'use client'

import { useEffect } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Flex, ScrollArea, Text } from '@radix-ui/themes'
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
import { Claim, Sort } from '@/types'
import { formatDate, getSortDir } from '@/utils'
import { useStore as useTabStore } from '../store'
import { RevenueCycleTab } from '../types'
import { getInsurancePayerName } from '../utils'
import { TableHeaderCheckboxCell, TableRowCheckboxCell } from './cells'
import { transformInSubmissions } from './data'
import { useStore } from './store'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<Claim>[] => {
  return [
    {
      id: 'select',
      size: 10,
      header: ({ table }) => (
        <TableHeaderCheckboxCell
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={table.toggleAllPageRowsSelected}
        />
      ),
      cell: ({ row }) => (
        <Box className="pl-[2px]">
          <TableRowCheckboxCell
            claimId={row.original.id}
            checked={row.getIsSelected()}
            onCheckedChange={row.toggleSelected}
          />
        </Box>
      ),
    },
    {
      id: 'claimNumber',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          column={column}
          label="Claim #"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.claimNumber}</TextCell>,
    },
    {
      id: 'patientName',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          label="Patient Name"
          column={column}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.patientName}</TextCell>,
    },
    {
      id: 'patientAccountNumber',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          column={column}
          label="MRN #"
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.patientAccountNumber}</TextCell>
      ),
    },
    {
      id: 'dateOfServiceFrom',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          column={column}
          label="DOS"
        />
      ),
      cell: ({ row }) => (
        <DateCell>
          {formatDate(`${row.original.dateOfServiceFrom}`, 'MM/dd/yyyy')}
        </DateCell>
      ),
    },
    {
      id: 'primaryPatientInsurancePlan',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          column={column}
          label="Primary Ins."
        />
      ),
      cell: ({ row }) => (
        <TextCell>
          {getInsurancePayerName(
            'Primary',
            row.original.claimInsurancePolicies ?? [],
          )}
        </TextCell>
      ),
    },
    {
      id: 'secondaryPatientInsurancePlan',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          column={column}
          label="Secondary"
        />
      ),
      cell: ({ row }) => (
        <TextCell>
          {getInsurancePayerName(
            'Secondary',
            row.original.claimInsurancePolicies ?? [],
          )}
        </TextCell>
      ),
    },
    {
      id: 'claimStatusCode',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          column={column}
          label="Claim Status"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.claimStatusCode}</TextCell>,
    },
    {
      id: 'totalAmount',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          column={column}
          label="Total Charge"
        />
      ),
      cell: ({ row }) => (
        <TextCell hasPayment>{row.original.totalAmount}</TextCell>
      ),
    },
    {
      id: 'amountDue',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          column={column}
          label="Due Amount"
        />
      ),
      cell: ({ row }) => (
        <TextCell hasPayment>{row.original.amountDue}</TextCell>
      ),
    },
    {
      id: 'createdOn',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          column={column}
          label="Created On"
        />
      ),
      cell: ({ row }) => (
        <DateCell>
          {formatDate(`${row.original.metadata?.createdOn}`, 'MM/dd/yyyy')}
        </DateCell>
      ),
    },
    {
      id: 'submittedDate',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          column={column}
          label="Submitted On"
        />
      ),
      cell: ({ row }) => (
        <DateCell>
          {row.original.submittedDate
            ? formatDate(`${row.original.submittedDate}`, 'MM/dd/yyyy')
            : '--'}
        </DateCell>
      ),
    },
  ]
}

const SubmissionTable = () => {
  const { data, loading, sort, sortData, search, setSelectedRows } = useStore(
    (state) => ({
      data: state.data,
      loading: state.loading,
      sort: state.sort,
      sortData: state.sortData,
      search: state.search,
      setSelectedRows: state.setSelectedRows,
    }),
  )
  const currentTab = useTabStore((state) => state.activeTab)

  const claimStatusCodes = useCodesetCodes(CODESETS.ClaimStatus)
  useEffect(() => {
    if (currentTab !== RevenueCycleTab.Submission) return
    setSelectedRows([])
    search({}, 1, true)
  }, [currentTab])
  if (loading) {
    return (
      <Flex className="flex-1" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }
  if (!data) {
    return (
      <Flex height="100%" align="center" justify="center">
        <Text
          weight="light"
          className="flex items-center gap-2 text-[14px] text-gray-10"
        >
          <MagnifyingGlassIcon width={18} height={18} />
          Use the form to search for submissions
        </Text>
      </Flex>
    )
  }
  return (
    <ScrollArea className="flex-1 shadow-1">
      <DataTable
        tableClass="[&_.rt-ScrollAreaRoot]:pb-2"
        data={transformInSubmissions(claimStatusCodes, data.submissions)}
        columns={columns(sort, sortData)}
        onRowClick={(row) => {
          // TODO: Row click can be implemented here
        }}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}
export { SubmissionTable }
