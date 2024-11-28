'use client'

import { useEffect } from 'react'
import { Badge, Flex, ScrollArea } from '@radix-ui/themes'
import { badgePropDefs } from '@radix-ui/themes/dist/cjs/components/badge.props.js'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { SharedCode, Sort } from '@/types'
import { getSortDir } from '@/utils'
import { CPT } from '../types'
import { ActionsCell } from './cells/actions-cell'
import { useStore } from './store'
import { getCPTDisplay } from './utils'

const columns = (
  CPTCodeSet: SharedCode[],
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
      cell: ({ row }) => <TextCell hasPayment>{row.original.mdDoAmount}</TextCell>,
    },
    {
      id: 'npAmount',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          label="NP"
          column={column}
        />
      ),
      cell: ({ row }) => <TextCell hasPayment>{row.original.npAmount}</TextCell>,
    },
    {
      id: 'paAmount',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          label="PA"
          column={column}
        />
      ),
      cell: ({ row }) => <TextCell hasPayment>{row.original.paAmount}</TextCell>,
    },
    {
      id: 'psyDAmount',
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
      cell: ({ row }) => (
        <TextCell hasPayment>{row.original.psyDAmount}</TextCell>
      ),
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
      cell: ({ row }) => (
        <TextCell hasPayment>{row.original.mastersAmount}</TextCell>
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
      cell: ({ row }) => (
        <TextCell> {getCPTDisplay(row.original.category, CPTCodeSet)}</TextCell>
      ),
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
      cell: ({ row }) => (
        <TextCell>
          {row.original.gender === 'NotSpecified'
            ? 'Not Specified'
            : row.original.gender}
        </TextCell>
      ),
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
  const CPTCodeSet = useCodesetCodes(CODESETS.FeeScheduleCategoryType)
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
        <LoadingPlaceholder />
      </Flex>
    )
  }
  return (
    <ScrollArea>
      <DataTable
        data={data.cptList}
        columns={columns(CPTCodeSet, sort, sortData)}
        disablePagination
        tableClass="bg-white w-[calc(100vw_-_198px)] [&_.rt-ScrollAreaRoot]:!overflow-visible"
        theadClass="z-[1]"
      />
    </ScrollArea>
  )
}
export { MasterFeeScheduleTable }
