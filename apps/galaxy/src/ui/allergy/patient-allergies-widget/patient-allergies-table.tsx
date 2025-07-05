'use client'

import { Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  DateCell,
  LoadingPlaceholder,
  LongTextCell,
  TextCell,
} from '@/components'
import { Sort } from '@/types'
import { getSlashedPaddedDateString, getSortDir } from '@/utils'
import {
  ActionsCell,
  AllergyType,
  Reaction,
  SeverityCell,
  Status,
} from './cells'
import { useStore } from './store'
import type { AllergyDataResponse } from './types'

interface PatientAllergiesTableProps {
  scriptSureAppUrl: string
}

const columns = (
  scriptSureAppUrl: string,
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<AllergyDataResponse>[] => [
  {
    id: 'allergyType',
    accessorKey: 'allergyType',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => {
          onSort?.(column.id)
        }}
        label="Type"
      />
    ),
    cell: ({ row }) => <AllergyType row={row} />,
  },
  {
    id: 'allergyName',
    accessorKey: 'allergyName',
    header: ({ column }) => (
      <ColumnHeader
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => {
          onSort?.(column.id)
        }}
        column={column}
        label="Allergy"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.allergyName}</TextCell>,
  },
  {
    id: 'reactionId',
    accessorKey: 'reactionId',
    header: ({ column }) => (
      <ColumnHeader
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => {
          onSort?.(column.id)
        }}
        column={column}
        label="Reaction"
      />
    ),
    cell: ({ row }) => <Reaction row={row} />,
  },
  {
    id: 'severityCode',
    accessorKey: 'severityCode',
    header: ({ column }) => (
      <ColumnHeader
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => {
          onSort?.(column.id)
        }}
        column={column}
        label="Severity"
      />
    ),
    cell: SeverityCell,
  },
  {
    id: 'recordStatus',
    accessorKey: 'recordStatus',
    header: ({ column }) => (
      <ColumnHeader
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => {
          onSort?.(column.id)
        }}
        column={column}
        label="Status"
      />
    ),
    cell: ({ row }) => <Status row={row} />,
  },
  {
    id: 'onsetBegan',
    accessorKey: 'onsetBegan',
    header: ({ column }) => (
      <ColumnHeader
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => {
          onSort?.(column.id)
        }}
        column={column}
        label="Observation Date"
      />
    ),
    cell: ({ row }) => (
      <DateCell>
        {row.original.onsetBegan &&
          getSlashedPaddedDateString(`${row.original.onsetBegan}`)}
      </DateCell>
    ),
  },
  {
    id: 'onsetEnded',
    accessorKey: 'onsetEnded',
    header: ({ column }) => (
      <ColumnHeader
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => {
          onSort?.(column.id)
        }}
        column={column}
        label="End Date"
      />
    ),
    cell: ({ row }) => (
      <DateCell>
        {row.original.onsetEnded &&
          getSlashedPaddedDateString(`${row.original.onsetEnded}`)}
      </DateCell>
    ),
  },
  {
    id: 'comment',
    accessorKey: 'comment',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Notes"
      />
    ),
    cell: ({ row }) => <LongTextCell>{row.original.comment}</LongTextCell>,
  },
  {
    id: 'allergy-actions',
    header: ({ column }) => <ColumnHeader column={column} label="Actions" />,
    cell: ({ row }) => (
      <ActionsCell row={row} scriptSureAppUrl={scriptSureAppUrl} />
    ),
  },
]

const PatientAllergiesTable = ({
  scriptSureAppUrl,
}: PatientAllergiesTableProps) => {
  const { data, allergiesListLoading, sort, sortData } = useStore((state) => ({
    data: state.allergiesListData,
    allergiesListLoading: state.allergiesListLoading,
    sort: state.sort,
    sortData: state.sortData,
  }))

  if (allergiesListLoading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <ScrollArea>
      <DataTable
        data={data ?? []}
        columns={columns(scriptSureAppUrl, sort, sortData)}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { PatientAllergiesTable }
