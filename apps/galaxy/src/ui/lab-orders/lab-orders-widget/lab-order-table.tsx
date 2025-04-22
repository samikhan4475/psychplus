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
import { formatUTCDate } from '@/utils'
import { LabTestCell, ResultsCell, StatusCell } from './cells'
import { ActionsCell } from './cells/actions-cell'
import { useStore } from './store'

const getColumns: (
  appointmentId: string,
  afterSummaryVisit: boolean,
) => ColumnDef<LabOrders>[] = (appointmentId, afterSummaryVisit) => {
  const baseColumns: ColumnDef<LabOrders>[] = [
    {
      id: 'labOrderDate',
      accessorKey: 'labOrderDate',
      header: ({ column }) => (
        <ColumnHeader column={column} clientSideSort label="Date/Time" />
      ),
      cell: ({ row }) => (
        <DateTimeCell>
          {formatUTCDate(row.original.labOrderDate, 'MM/dd/yy HH:mm')}
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
        <ColumnHeader column={column} clientSideSort label="Provider" />
      ),
      cell: ({ row }) => (
        <TextCell>
          {row.original?.orderingStaffName?.firstName ?? ''}{' '}
          {row.original?.orderingStaffName?.lastName ?? ''}
          {', '}
          {row.original?.orderingStaffName?.honors ?? ''}
        </TextCell>
      ),
    },
  ]

  if (afterSummaryVisit) {
    baseColumns.push({
      id: 'initiated',
      accessorKey: 'initiated',
      header: ({ column }) => (
        <ColumnHeader column={column} clientSideSort label="Initiated" />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original?.metadata?.createdByFullName ?? ''}</TextCell>
      ),
    })
  }

  const remainingColumns: ColumnDef<LabOrders>[] = [
    {
      id: 'labTests',
      accessorKey: 'labTests',
      header: ({ column }) => (
        <ColumnHeader column={column} clientSideSort label="Test" />
      ),
      cell: ({ row }) => <LabTestCell row={row} />,
    },
    {
      id: 'orderingLab.name',
      accessorKey: 'orderingLab.name',
      header: ({ column }) => (
        <ColumnHeader column={column} clientSideSort label="Location" />
      ),
      cell: ({ row }) => <TextCell>{row.original?.orderingLab?.name}</TextCell>,
    },
    {
      id: 'orderStatus',
      accessorKey: 'orderStatus',
      header: ({ column }) => (
        <ColumnHeader
          label="Lab Status"
          column={column}
          className="!text-black p-1 !font-medium"
          clientSideSort
        />
      ),
      cell: ({ row }) => <StatusCell row={row} />,
    },
    {
      id: 'results',
      size: 150,
      header: () => <ColumnHeader label="Result" />,
      cell: ({ row }) => <ResultsCell row={row} />,
    },
  ]

  const columns = [...baseColumns, ...remainingColumns]

  if (!afterSummaryVisit && appointmentId !== '0') {
    return [
      ...columns,
      {
        id: 'actions',
        size: 100,
        header: () => <ColumnHeader label="Actions" />,
        cell: ({ row }) => <ActionsCell row={row} />,
      },
    ]
  }

  return columns
}

const LabOrderTable = ({ afterSummaryVisit = false }) => {
  const searchParams = useSearchParams()
  const { data, fetch, loading, setAppointmentId } = useStore()
  const { id } = useParams<{ id: string }>()
  const appointmentId = searchParams.get('id') ?? '0'

  useEffect(() => {
    setAppointmentId(appointmentId)
    const payload = {
      patientId: [id],
      ...(appointmentId !== '0' ? { appointmentIds: [appointmentId] } : {}),
    }
    fetch(appointmentId, payload)
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
        columns={getColumns(appointmentId, afterSummaryVisit)}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { LabOrderTable }
