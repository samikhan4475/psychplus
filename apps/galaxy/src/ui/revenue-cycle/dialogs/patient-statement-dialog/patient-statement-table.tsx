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
import { Sort } from '@/types'
import { getSortDir } from '@/utils'
import { PatientStatement } from '../../types'
import { useStore } from './store'
import { TableRowCheckboxCell } from './table-row-checkbox-cell'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<PatientStatement>[] => {
  return [
    {
      id: 'select',
      size: 10,
      cell: ({ row }) => <TableRowCheckboxCell row={row} />,
    },
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
      cell: ({ row }) => <TextCell>{row.original.claimNumber}</TextCell>,
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
      cell: ({ row }) => (
        <TextCell>{`${row.original.patientFirstName} ${row.original.patientLastName}`}</TextCell>
      ),
    },
    {
      id: 'accountNumber',
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
      cell: ({ row }) => <TextCell>{row.original.accountNumber}</TextCell>,
    },

    {
      id: 'patientBalanceDue',
      header: ({ column }) => (
        <ColumnHeader
          label="Patient Balance Due"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>${row.original.patientBalanceDue}</TextCell>,
    },
  ]
}

const PatientStatementTable = ({ patientId }: { patientId: number }) => {
  const { data, search, loading, sort, sortData } = useStore((state) => ({
    data: state.patientStatementData,
    loading: state.patientStatementLoading,
    search: state.search,
    sort: state.sort,
    sortData: state.sortData,
  }))

  useEffect(() => {
    search(patientId, {
      patientIds: [patientId],
    })
  }, [])

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
        data={data?.patientStatements ?? []}
        columns={columns(sort, sortData)}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { PatientStatementTable }
