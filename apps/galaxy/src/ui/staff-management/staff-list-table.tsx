'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { useStore as useRootStore } from '@/store'
import { Sort } from '@/types'
import { getSortDir } from '@/utils'
import { ActionsCell, CollapseCell } from './cells'
import { useStore } from './store'
import { Staff } from './types'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<Staff>[] => {
  return [
    {
      id: 'hx',
      header: ({ column }) => (
        <ColumnHeader
          label="Hx"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      maxSize: 30,
      cell: CollapseCell,
    },
    {
      id: 'firstName',
      header: ({ column }) => (
        <ColumnHeader
          label="First Name"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.legalName?.firstName}</TextCell>
      ),
    },
    {
      id: 'lastName',
      header: ({ column }) => (
        <ColumnHeader
          label="Last Name"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.legalName?.lastName}</TextCell>
      ),
    },
    {
      id: 'noindex',
      header: ({ column }) => (
        <ColumnHeader
          label="Staff Type"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'noindex',
      header: ({ column }) => (
        <ColumnHeader
          label="Role"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'noindex',
      header: ({ column }) => (
        <ColumnHeader
          label="Credentials"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'noindex',
      header: ({ column }) => (
        <ColumnHeader
          label="Supervised By"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'noindex',
      header: ({ column }) => (
        <ColumnHeader
          label="Organization"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'noindex',
      header: ({ column }) => (
        <ColumnHeader
          label="Practice"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'noindex',
      header: ({ column }) => (
        <ColumnHeader
          label="Individual NPI"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'noindex',
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
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'noindex',
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
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'noindex',
      header: ({ column }) => (
        <ColumnHeader
          label="Gender"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'noindex',
      header: ({ column }) => (
        <ColumnHeader
          label="Language"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'noindex',
      header: ({ column }) => (
        <ColumnHeader
          label="Provider Preference"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'noindex',
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
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'noindex',
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
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'noindex',
      header: ({ column }) => (
        <ColumnHeader
          label="Virtual Wait Room"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'noindex',
      header: ({ column }) => (
        <ColumnHeader
          label="Home Address"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'actions',
      header: () => <ColumnHeader label="Actions" />,
      cell: ActionsCell,
    },
  ]
}

const StaffListTable = () => {
  const router = useRouter()

  const addTab = useRootStore((state) => state.addTab)

  const { data, search, loading, sort, sortData } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    search: state.search,
    sort: state.sort,
    sortData: state.sortData,
  }))

  useEffect(() => {
    search({})
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
        data={data?.staff ?? []}
        onRowClick={(row) => {
          const href = `/staff/${row.original.id}/dashboard`
          addTab({
            href,
            label: `${row.original?.legalName?.firstName} ${row.original.legalName?.lastName}`,
          })
          router.push(href)
        }}
        columns={columns(sort, sortData)}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { StaffListTable }
