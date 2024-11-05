'use client'

import { useEffect } from 'react'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Badge, Flex, ScrollArea, Text } from '@radix-ui/themes'
import { badgePropDefs } from '@radix-ui/themes/dist/cjs/components/badge.props.js'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { Sort } from '@/types'
import { getSortDir } from '@/utils'
import { CPT } from '../types'
import { ActionsCell } from './cells/actions-cell'
import { useStore } from './store'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<CPT>[] => {
  return [
    {
      id: 'cptCode',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          label="CPT"
          column={column}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.cptCode}</TextCell>,
    },
    {
      id: 'placeOfService',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          label="POS"
          column={column}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.placeOfService}</TextCell>,
    },
    {
      id: 'mastersAmount',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          label="Masters"
          column={column}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.mastersAmount}</TextCell>,
    },
    {
      id: 'mdDoAmount',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          label="MD/DO"
          column={column}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.mdDoAmount}</TextCell>,
    },
    {
      id: 'npPaAmount',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          label="NP/PA"
          column={column}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.npPaAmount}</TextCell>,
    },
    {
      id: 'noindex',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          label="PsyD"
          column={column}
        />
      ),
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'medicareAmount',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          label="Medicare Amount"
          column={column}
        />
      ),
      cell: ({ row }) => (
        <TextCell hasPayment>{row.original.medicareAmount}</TextCell>
      ),
    },
    {
      id: 'description',

      header: ({ column }) => (
        <ColumnHeader
          className="min-w-[400px]"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          label="Description"
          column={column}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.description}</TextCell>,
    },
    {
      id: 'category',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          label="Category"
          column={column}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.category}</TextCell>,
    },
    {
      id: 'gender',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          label="Gender"
          column={column}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.gender}</TextCell>,
    },
    {
      id: 'minimumAge',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          label="Age Range"
          column={column}
        />
      ),
      cell: ({ row }) => (
        <TextCell>
          {row.original.minimumAge}-{row.original.maximumAge}
        </TextCell>
      ),
    },
    {
      id: 'recordStatus',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          label="Status"
          column={column}
        />
      ),
      cell: ({ row }) => {
        const badgeColors: Record<string, typeof badgePropDefs.color.default> =
          {
            Active: 'green',
            Inactive: 'gray',
          }
        return (
          <Badge
            className="rounded-1"
            color={badgeColors[row.original.recordStatus] ?? 'gray'}
          >
            {row.original.recordStatus}
          </Badge>
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
const MasterFeeScheduleTable = () => {
  const { data, loading, sort, sortData, search } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    sort: state.sort,
    sortData: state.sortData,
    search: state.search,
  }))
  useEffect(() => {
    search()
  }, [])
  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
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
          Use the form to search for cpts
        </Text>
      </Flex>
    )
  }
  return (
    <ScrollArea className="max-w-[calc(100vw-200px)]">
      <DataTable
        data={data.cptList}
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
export { MasterFeeScheduleTable }
