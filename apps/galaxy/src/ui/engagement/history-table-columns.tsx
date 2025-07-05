'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DateTimeCell, TextCell } from '@/components'
import { formatDate, formatDateTime } from '@/utils'
import HistoryVisitTypeCell from './history-visit-type-cell'
import { WaitlistResponse } from '@/types'

const getWaitlistHistoryColumns = () => {
  const columns: ColumnDef<WaitlistResponse>[] = [
    {
      id: 'username',
      accessorKey: 'username',
      accessorFn: (row) =>
        row?.metadata?.updatedByFullName ||
        row?.metadata?.createdByFullName ||
        '',
      header: ({ column }) => (
        <ColumnHeader clientSideSort label="User Name" column={column} />
      ),
      cell: ({ row }) => {
        return (
          <TextCell>
            {row.original?.metadata?.updatedByFullName
              ? row.original?.metadata?.updatedByFullName
              : row.original?.metadata?.createdByFullName}
          </TextCell>
        )
      },
    },
    {
      id: 'DateTime',
      accessorKey: 'DateTime',
      accessorFn: (row) => new Date(`${row.fromDate}T${row.fromTime}`),
      header: ({ column }) => (
        <ColumnHeader clientSideSort label="Date/Time" column={column} />
      ),
      cell: ({ row }) => (
        <DateTimeCell className="whitespace-nowrap">
          {formatDate(row.original?.fromDate)} - {row.original?.fromTime}
        </DateTimeCell>
      ),
    },
    {
      id: 'visitType',
      accessorKey: 'visitType',
      header: ({ column }) => (
        <ColumnHeader clientSideSort label="Visit Type" column={column} />
      ),
      cell: HistoryVisitTypeCell,
    },
    {
      id: 'patientName',
      accessorKey: 'patientName',
      accessorFn: (row) =>
        `${row?.patientName?.firstName || ''} ${
          row?.patientName?.middleName || ''
        } ${row?.patientName?.lastName || ''}`.trim(),
      header: ({ column }) => (
        <ColumnHeader clientSideSort column={column} label="Patient Name" />
      ),
      cell: ({ row }) => {
        return (
          <TextCell>
            {row.original?.patientName?.firstName +
              ' ' +
              row.original?.patientName?.middleName +
              ' ' +
              row.original?.patientName?.lastName}
          </TextCell>
        )
      },
    },
    {
      id: 'fromDateTime',
      accessorKey: 'fromDateTime',
      accessorFn: (row) => new Date(`${row.fromDate}T${row.fromTime}`),
      header: ({ column }) => (
        <ColumnHeader clientSideSort column={column} label="From Date/Time" />
      ),
      cell: ({ row }) => (
        <DateTimeCell className="whitespace-nowrap">
          {formatDate(row.original?.fromDate)} - {row.original?.fromTime}
        </DateTimeCell>
      ),
    },
    {
      id: 'toDateTime',
      accessorKey: 'toDateTime',
      accessorFn: (row) => new Date(`${row.toDate}T${row.toTime}`),
      header: ({ column }) => (
        <ColumnHeader clientSideSort column={column} label="To Date/Time" />
      ),
      cell: ({ row }) => (
        <DateTimeCell className="whitespace-nowrap">
          {formatDate(row.original?.toDate)} - {row.original?.toTime}
        </DateTimeCell>
      ),
    },
    {
      id: 'provider',
      accessorKey: 'provider',
      accessorFn: (row) =>
        `${row?.providerName?.firstName || ''} ${
          row?.providerName?.lastName || ''
        }`.trim(),
      header: ({ column }) => (
        <ColumnHeader clientSideSort column={column} label="Provider" />
      ),
      cell: ({ row }) => (
        <TextCell className="whitespace-nowrap">
          {row.original?.providerName?.firstName +
            ' ' +
            row.original?.providerName?.lastName}
        </TextCell>
      ),
    },
    {
      id: 'initiatedDateTime',
      accessorKey: 'initiatedDateTime',
      accessorFn: (row) => new Date(row.metadata?.createdOn),
      header: ({ column }) => (
        <ColumnHeader
          clientSideSort
          column={column}
          label="Initiated Date/Time"
        />
      ),
      cell: ({ row }) => (
        <DateTimeCell className="whitespace-nowrap">
          {formatDateTime(row.original?.metadata?.createdOn, false)}
        </DateTimeCell>
      ),
    },
    {
      id: 'waitingStatus',
      accessorKey: 'waitingStatus',
      header: ({ column }) => (
        <ColumnHeader clientSideSort column={column} label="Waitlist Status" />
      ),
      cell: ({ row }) => <TextCell>{row.original?.waitingStatus}</TextCell>,
    },
  ]
  return columns
}

export { getWaitlistHistoryColumns }
