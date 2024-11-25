'use client'

import { useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  DateTimeCell,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { LabOrders } from '@/types'
import { formatDateTime } from '@/utils/date'
import { LabTestCell, ResultsCell, StatusCell } from './cells'
import { ActionsCell } from './cells/actions-cell'
import { useStore } from './store'

const columns: ColumnDef<LabOrders>[] = [
  {
    id: 'order-date',
    header: () => <ColumnHeader clientSideSort label="Order Date" />,
    cell: ({ row }) => (
      <DateTimeCell>{formatDateTime(row.original.labOrderDate)}</DateTimeCell>
    ),
  },
  {
    id: 'lab-order',
    header: () => <ColumnHeader clientSideSort label="Lab Order #" />,
    cell: ({ row }) => <TextCell>{row.original.labOrderNumber}</TextCell>,
  },
  {
    id: 'ordered-by',
    header: () => <ColumnHeader clientSideSort label="Ordered By" />,
    cell: ({ row }) => <TextCell>{row.original.orderingStaffName}</TextCell>,
  },
  {
    id: 'test-panel',
    header: () => <ColumnHeader clientSideSort label="Test/Panel" />,
    cell: ({ row }) => <LabTestCell row={row} />,
  },
  {
    id: 'lab-location',
    header: () => <ColumnHeader clientSideSort label="Lab Location" />,
    cell: ({ row }) => <TextCell>{row.original?.orderingLab?.name}</TextCell>,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <ColumnHeader
        label="Status"
        column={column}
        className="!text-black p-1 !font-medium"
      />
    ),
    cell: ({ row }) => <StatusCell row={row} />,
  },
  {
    id: 'results',
    header: () => <ColumnHeader clientSideSort label="Results" />,
    cell: ({ row }) => <ResultsCell row={row} />,
  },
  {
    id: 'actions',
    header: () => <ColumnHeader label="Actions" />,
    cell: ({ row }) => <ActionsCell row={row} />,
  },
]

const LabOrderTable = () => {
  const searchParams = useSearchParams()
  const { data, fetch, loading } = useStore()
  const { id } = useParams<{ id: string }>()
  const appointmentId = searchParams.get('id')

  useEffect(() => {
    fetch({
      appointmentId: '32764',
      payload: {
        patientId: ['3318'],
        appointmentIds: ['32764'],
      },
    })
  }, [appointmentId, id])

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <ScrollArea>
      <DataTable data={data ?? []} columns={columns} disablePagination sticky />
    </ScrollArea>
  )
}

export { LabOrderTable }
