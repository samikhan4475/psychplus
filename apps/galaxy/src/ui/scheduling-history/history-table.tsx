'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { formatDateCell, formatTimeCell } from '../schedule/utils'
import { useStore } from './store'
import { PatientTransactionHistory } from './types'

const columns: (
  locationTimeZoneId: string,
) => ColumnDef<PatientTransactionHistory>[] = (locationTimeZoneId) => [
  {
    id: 'metadata.createdOn',
    accessorKey: 'metadata.createdOn',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        clientSideSort
        label="Date/Time"
        className="!text-black !font-medium"
      />
    ),
    cell: ({ row }) => (
      <TextCell>
        {formatDateCell(row.original?.metadata.createdOn, locationTimeZoneId)}{' '}
        {formatTimeCell(row.original?.metadata.createdOn, locationTimeZoneId)}
      </TextCell>
    ),
  },
  {
    id: 'metadata.createdByFullName',
    accessorKey: 'metadata.createdByFullName',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        clientSideSort
        label="User"
        className="!text-black !font-medium"
      />
    ),
    cell: ({ row }) => (
      <TextCell> {row.original.metadata.createdByFullName} </TextCell>
    ),
  },
  {
    accessorKey: 'coPay',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="CoPay"
        className="!text-black w-full text-center !font-medium"
      />
    ),
    columns: [
      {
        id: 'coPayDue',
        accessorKey: 'coPayDue',
        header: ({ column }) => (
          <ColumnHeader
            column={column}
            clientSideSort
            label="Due"
            className="!text-black !font-medium"
          />
        ),
        cell: ({ row }) => <TextCell>{row.original.coPayDue} </TextCell>,
      },
      {
        id: 'coPayPaid',
        accessorKey: 'coPayPaid',
        header: ({ column }) => (
          <ColumnHeader
            column={column}
            clientSideSort
            label="Paid"
            className="!text-black !font-medium"
          />
        ),
        cell: ({ row }) => <TextCell>{row.original.coPayPaid} </TextCell>,
      },
    ],
  },
  {
    accessorKey: 'coins',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="CoIns"
        className="!text-black w-full text-center !font-medium"
      />
    ),
    columns: [
      {
        id: 'coInsuranceDue',
        accessorKey: 'coInsuranceDue',
        header: ({ column }) => (
          <ColumnHeader
            column={column}
            clientSideSort
            label="Due"
            className="!text-black !font-medium"
          />
        ),
        cell: ({ row }) => <TextCell>{row.original.coInsuranceDue} </TextCell>,
      },
      {
        id: 'coInsurancePaid',
        accessorKey: 'coInsurancePaid',
        header: ({ column }) => (
          <ColumnHeader
            column={column}
            clientSideSort
            label="Paid"
            className="!text-black !font-medium"
          />
        ),
        cell: ({ row }) => <TextCell>{row.original.coInsurancePaid} </TextCell>,
      },
    ],
  },
  {
    accessorKey: 'balance',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Balance"
        className="!text-black w-full text-center !font-medium"
      />
    ),
    columns: [
      {
        id: 'balanceDue',
        accessorKey: 'balanceDue',
        header: ({ column }) => (
          <ColumnHeader
            column={column}
            clientSideSort
            label="Due"
            className="!text-black !font-medium"
          />
        ),
        cell: ({ row }) => <TextCell>{row.original.balanceDue} </TextCell>,
      },
      {
        id: 'balancePaid',
        accessorKey: 'balancePaid',
        header: ({ column }) => (
          <ColumnHeader
            column={column}
            clientSideSort
            label="Paid"
            className="!text-black !font-medium"
          />
        ),
        cell: ({ row }) => <TextCell>{row.original.balancePaid}</TextCell>,
      },
    ],
  },
]
const HistoryTable = ({
  appointmentId,
  locationTimeZoneId,
}: {
  appointmentId: number
  locationTimeZoneId: string
}) => {
  const { id } = useParams<{ id: string }>()

  const {
    patientTransactionData: data,
    patientTransactionHistoryLoading,
    fetchPatientTransactionHistory,
  } = useStore()

  useEffect(() => {
    fetchPatientTransactionHistory(id, appointmentId)
  }, [id, appointmentId])
  return (
    <ScrollArea className="h-36" scrollbars="vertical">
      {patientTransactionHistoryLoading ? (
        <Flex height="100%" align="center" justify="center">
          <LoadingPlaceholder />
        </Flex>
      ) : (
        <DataTable
          columns={columns(locationTimeZoneId)}
          data={data ?? []}
          isRowSpan
        />
      )}
    </ScrollArea>
  )
}
export { HistoryTable }
