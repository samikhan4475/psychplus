'use client'

import { useCallback, useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { ColumnDef, Row } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  LongTextCell,
  TextCell,
} from '@/components'
import { PatientPayment } from '@/types'
import { formatCurrency, formatDateTime } from '@/utils'
import { TableHeaderCheckboxCell, TableRowCheckboxCell } from './cells'
import { FilterForm } from './filter-form'
import { useStore } from './store'

const columns: ColumnDef<PatientPayment>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <TableHeaderCheckboxCell
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={table.toggleAllPageRowsSelected}
      />
    ),
    cell: ({ row }) => (
      <TableRowCheckboxCell
        checked={row.getIsSelected()}
        onCheckedChange={row.toggleSelected}
      />
    ),
    size: 20,
  },
  {
    accessorKey: 'paymentMethod',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        clientSideSort
        sortable
        label="Payment Method"
      />
    ),
    cell: ({ row }) => <TextCell>{row?.original?.paymentMethod}</TextCell>,
  },
  {
    accessorKey: 'paymentDescription',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Description" />
    ),
    cell: ({ row }) => (
      <LongTextCell>{row?.original?.paymentDescription}</LongTextCell>
    ),
  },
  {
    accessorKey: 'paymentDateTime',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Payment Date" />
    ),
    cell: ({ row }) => (
      <TextCell>{formatDateTime(row?.original?.paymentDateTime)}</TextCell>
    ),
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Amount" />
    ),
    cell: ({ row }) => (
      <TextCell>{formatCurrency(row?.original?.amount)}</TextCell>
    ),
  },
]
interface PaymentsTableProps {
  patientId: string
}
const PaymentsTable = ({ patientId }: PaymentsTableProps) => {
  const { data, fetchPatientPayments, setSelectedRows, loading } = useStore(
    (state) => ({
      data: state.data,
      loading: state.loading,
      fetchPatientPayments: state.fetchPatientPayments,
      setSelectedRows: state.setSelectedRows,
      selectedRows: state.selectedRows,
    }),
  )
  useEffect(() => {
    fetchPatientPayments(patientId)
  }, [patientId, fetchPatientPayments])

  const onRowSelectionChange = useCallback(
    (selectedRows: Row<PatientPayment>[]) => {
      const selectedIds = selectedRows.map(({ original }) => original.id)
      setSelectedRows(selectedIds)
    },
    [setSelectedRows],
  )

  return (
    <Flex gap="3" direction="column">
      <FilterForm patientId={patientId} />
      <ScrollArea className="h-[46vh]">
        {loading ? (
          <LoadingPlaceholder className="bg-white h-full" />
        ) : (
          <DataTable
            columns={columns}
            data={data?.payments ?? []}
            onRowSelectionChange={onRowSelectionChange}
            sticky
            theadClass="z-10"
          />
        )}
      </ScrollArea>
    </Flex>
  )
}

export { PaymentsTable }
