'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { Sort } from '@/types'
import { getMaskedPhoneNumber, getSortDir } from '@/utils'
import { Practice } from '../organization-practice/types'
import { ActionsCell } from './cells'
import { PracticesHistoryDialog } from './practices-history-dialog'
import { useStore } from './store'
import { PracticeNameCell } from './table-row-practice-name-cell'

const columns = (
  isPractices?: boolean,
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<Practice>[] => {
  const baseColumns: ColumnDef<Practice>[] = [
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
      id: 'taxId',
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
  ]
  if (isPractices) {
    baseColumns.push({
      id: 'organizationDisplayName',
      header: ({ column }) => (
        <ColumnHeader
          label="Organization Name"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.organizationDisplayName}</TextCell>
      ),
    })
  }
  baseColumns.push(
    {
      id: 'address1',
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
      cell: ({ row }) => (
        <TextCell>{row.original.practiceAddress?.street1 ?? ''}</TextCell>
      ),
    },
    {
      id: 'address2',
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
      cell: ({ row }) => (
        <TextCell>{row.original.practiceAddress?.street2 ?? ''}</TextCell>
      ),
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
      cell: ({ row }) => (
        <TextCell>{row.original.practiceAddress?.city ?? ''}</TextCell>
      ),
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
      cell: ({ row }) => (
        <TextCell>{row.original.practiceAddress?.state ?? ''}</TextCell>
      ),
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
      cell: ({ row }) => (
        <TextCell>{row.original.practiceAddress?.postalCode ?? ''}</TextCell>
      ),
    },
    {
      id: 'areaCode',
      header: ({ column }) => (
        <ColumnHeader
          label="Area Code"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.practiceAddress?.zipLast4 ?? ''}</TextCell>
      ),
    },
    {
      id: 'practicePhone',
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
        <TextCell className="truncate">
          {getMaskedPhoneNumber(row?.original?.practicePhone ?? '')}
        </TextCell>
      ),
    },
    {
      id: 'practiceFax',
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
      id: 'payAddress1',
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
      cell: ({ row }) => (
        <TextCell>
          {row.original.practicePaymentAddress?.street1 ?? ''}
        </TextCell>
      ),
    },
    {
      id: 'defaultProviderName',
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
      cell: ({ row }) => (
        <TextCell>{row.original.defaultProviderName}</TextCell>
      ),
    },
    {
      id: 'defaultClearinghouseReceiverName',
      header: ({ column }) => (
        <ColumnHeader
          label="Default Clearinghouse"
          column={column}
          clientSideSort
        />
      ),
      cell: ({ row }) => (
        <TextCell>
          {row.original.defaultClearinghouseReceiverName ?? ''}
        </TextCell>
      ),
    },
    {
      id: 'isAutoSubmissionEnabled',
      header: ({ column }) => (
        <ColumnHeader label="Auto Submission" column={column} clientSideSort />
      ),
      cell: ({ row }) => (
        <TextCell>
          {row.original.isAutoSubmissionEnabled ? 'Yes' : 'No'}
        </TextCell>
      ),
    },
    {
      id: 'isAutoPaymentPostingEnabled',
      header: ({ column }) => (
        <ColumnHeader
          label="Auto Payment Posting"
          column={column}
          clientSideSort
        />
      ),
      cell: ({ row }) => (
        <TextCell>
          {row.original.isAutoPaymentPostingEnabled ? 'Yes' : 'No'}
        </TextCell>
      ),
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
      cell: ({ row }) => <PracticesHistoryDialog row={row} />,
    },
    {
      id: 'actions',
      header: () => <ColumnHeader label="Actions" />,
      cell: ActionsCell,
    },
  )
  return baseColumns
}

interface OrganizationPracticesListTableProps {
  isPractices?: boolean
}
const OrganizationPracticesListTable = ({
  isPractices,
}: OrganizationPracticesListTableProps) => {
  const { id } = useParams<{ id: string }>()
  const { search, data, loading, sort, sortData } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    search: state.search,
    sort: state.sort,
    sortData: state.sortData,
  }))
  useEffect(() => {
    if (!isPractices) {
      search({
        organizationId: id,
      })
    } else {
      search()
    }
  }, [])

  if (loading) {
    return (
      <Flex height="100%" width="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <Box className="bg-white rounded my-1 p-1">
      <ScrollArea className="rounded p-1">
        <DataTable
          data={data || []}
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
