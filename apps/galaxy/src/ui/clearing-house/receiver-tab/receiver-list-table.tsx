'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { ClearingHouseReceiver, Sort } from '@/types'
import { getMaskedPhoneNumber, getSortDir } from '@/utils'
import { ActionsCell } from './actions-cell'
import { StateNameCell } from './state-name-cell'
import { useStore } from './store'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<ClearingHouseReceiver>[] => {
  return [
    {
      id: 'clearingHouseName',
      header: ({ column }) => (
        <ColumnHeader
          label="Clearinghouse Name"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.clearingHouseName}</TextCell>,
    },
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
      cell: ({ row }) => <TextCell>{row.original.address1}</TextCell>,
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
      cell: ({ row }) => <TextCell>{row.original.address2}</TextCell>,
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
      cell: ({ row }) => <TextCell>{row.original.city}</TextCell>,
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
      cell: ({ row }) => <StateNameCell row={row} />,
    },

    {
      id: 'zip',
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
      cell: ({ row }) => <TextCell>{row.original.zip}</TextCell>,
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
      cell: ({ row }) => (
        <TextCell className="truncate">
          {getMaskedPhoneNumber(row?.original?.phone ?? '')}
        </TextCell>
      ),
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
      cell: ({ row }) => <TextCell>{row.original.fax}</TextCell>,
    },

    {
      id: 'email',
      header: ({ column }) => (
        <ColumnHeader
          label="Email"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.email}</TextCell>,
    },

    {
      id: 'website',
      header: ({ column }) => (
        <ColumnHeader
          label="Website"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.website}</TextCell>,
    },

    {
      id: 'submissionMethod',
      header: ({ column }) => (
        <ColumnHeader
          label="Submission Method"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.submissionMethod}</TextCell>,
    },

    {
      id: 'receiverName',
      header: ({ column }) => (
        <ColumnHeader
          label="Rec. Name"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.receiverName}</TextCell>,
    },

    {
      id: 'receiverId',
      header: ({ column }) => (
        <ColumnHeader
          label="Rec. ID"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.receiverId}</TextCell>,
    },
    {
      id: 'actions',
      header: () => <ColumnHeader label="Actions" />,
      cell: ({ row }) => <ActionsCell row={row} />,
    },
  ]
}

const ReceiverListTable = () => {
  const searchParams = useSearchParams()
  const practiceId = searchParams.get('practice')
  const { data, search, loading, sort, sortData } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    search: state.search,
    sort: state.sort,
    sortData: state.sortData,
  }))

  useEffect(() => {
    const payload = practiceId ? { practiceId: practiceId ?? '' } : {}
    search(payload)
  }, [practiceId])

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <ScrollArea>
      <DataTable
        data={data?.receivers ?? []}
        columns={columns(sort, sortData)}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { ReceiverListTable }
