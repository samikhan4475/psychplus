'use client'

import { useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import {
  ColumnHeader,
  DataTable,
  DateTimeCell,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { LabOrders } from '@/types'
import { LabTestCell, ResultsCell, StatusCell } from './cells'
import { ActionsCell } from './cells/actions-cell'
import { useStore } from './store'

const columns: ColumnDef<LabOrders>[] = [
  {
    id: 'labOrderDate',
    accessorKey: 'labOrderDate',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Order Date" />
    ),
    cell: ({ row }) => (
      <DateTimeCell>
        {format(new Date(row.original.labOrderDate), 'MM/dd/yyyy HH:mm')}
      </DateTimeCell>
    ),
  },
  {
    id: 'labOrderNumber',
    accessorKey: 'labOrderNumber',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Lab Order Number" />
    ),
    cell: ({ row }) => <TextCell>{row.original.labOrderNumber}</TextCell>,
  },
  {
    id: 'orderingStaffName',
    accessorKey: 'orderingStaffName',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Ordered By" />
    ),
    cell: ({ row }) => <TextCell>{row.original.orderingStaffName}</TextCell>,
  },
  {
    id: 'labTests',
    accessorKey: 'labTests',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Test/Panel" />
    ),
    cell: ({ row }) => <LabTestCell row={row} />,
  },
  {
    id: 'orderingLab.name',
    accessorKey: 'orderingLab.name',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Lab Location" />
    ),
    cell: ({ row }) => <TextCell>{row.original?.orderingLab?.name}</TextCell>,
  },
  {
    id: 'orderStatus',
    accessorKey: 'orderStatus',
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
    size: 100,
    header: () => <ColumnHeader label="Result" />,
    cell: ({ row }) => <ResultsCell row={row} />,
  },
  {
    id: 'actions',
    size: 50,
    header: () => <ColumnHeader label="Actions" />,
    cell: ({ row }) => <ActionsCell row={row} />,
  },
]

const LabOrderTable = () => {
  const searchParams = useSearchParams()
  const { data, fetch, loading, setAppointmentId } = useStore()
  const { id } = useParams<{ id: string }>()
  const appointmentId = searchParams.get('id')

  useEffect(() => {
    if (appointmentId) {
      setAppointmentId(appointmentId)
      const payload = {
        patientId: [id],
        appointmentIds: [appointmentId],
      }
      fetch(appointmentId, payload)
    }
  }, [appointmentId, id])

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center" className="mt-5">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <ScrollArea>
      <DataTable
        data={data?.labOrders ?? []}
        columns={columns}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { LabOrderTable }
