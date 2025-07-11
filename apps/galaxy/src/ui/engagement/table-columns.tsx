'use client'

import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ColumnHeader, DateTimeCell, SelectCell, TextCell } from '@/components'
import { WaitlistResponse } from '@/types'
import { formatDate } from '@/utils'
import { ActionsCell } from './actions-cell'
import { WAITLIST_STATUS_CODESET } from './constant'
import { getVisitMediumLabel } from './utils'

const getWaitlistColumns = (isManagement: boolean) => {
  const columns: ColumnDef<WaitlistResponse>[] = [
    {
      id: 'visitType',
      accessorKey: 'visitType',
      header: ({ column }) => (
        <ColumnHeader clientSideSort label="Visit Type" column={column} />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original?.serviceOfferedDescription}</TextCell>
      ),
    },
    {
      id: 'visitMedium',
      accessorKey: 'visitMedium',
      header: ({ column }) => (
        <ColumnHeader clientSideSort label="Visit Medium" column={column} />
      ),
      cell: ({ row }) => (
        <TextCell>{getVisitMediumLabel(row.original?.visitMedium)}</TextCell>
      ),
    },
    ...(!isManagement
      ? [
          {
            id: 'patientName',
            accessorKey: 'patientName',
            accessorFn: (row: any) =>
              `${row?.patientName?.firstName || ''} ${
                row?.patientName?.lastName || ''
              }`,
            header: ({ column }: any) => (
              <ColumnHeader label="Patient Name" column={column} />
            ),
            cell: ({ row }: any) => (
              <TextCell>
                {row.original?.patientName?.firstName +
                  ' ' +
                  row.original?.patientName?.lastName}
              </TextCell>
            ),
          },
        ]
      : []),
    {
      id: 'fromDateTime',
      accessorKey: 'fromDateTime',
      accessorFn: (row) => new Date(`${row.fromDate}T${row.fromTime}`),
      header: ({ column }) => (
        <ColumnHeader clientSideSort label="From Date/Time" column={column} />
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
        <ColumnHeader clientSideSort label="To Date/Time" column={column} />
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
        }`,
      header: ({ column }) => (
        <ColumnHeader clientSideSort column={column} label="Provider" />
      ),
      cell: ({ row }) => (
        <TextCell>
          {row?.original?.providerName?.firstName +
            ' ' +
            row?.original?.providerName?.lastName}
        </TextCell>
      ),
    },
    {
      id: 'initiatedDateTime',
      accessorKey: 'initiatedDateTime',
      accessorFn: (row) => new Date(row?.metadata?.createdOn),
      header: ({ column }) => (
        <ColumnHeader
          clientSideSort
          column={column}
          label="Initiated Date/Time"
        />
      ),
      cell: ({ row }) => (
        <DateTimeCell className="whitespace-nowrap">
          {formatDate(row.original?.metadata?.createdOn)} -{' '}
          {format(new Date(row.original?.metadata?.createdOn), 'HH:mm:ss')}
        </DateTimeCell>
      ),
    },
    {
      id: 'waitlistStatus',
      accessorKey: 'waitlistStatus',
      accessorFn: (row) => row?.waitingStatus,
      header: ({ column }) => (
        <ColumnHeader clientSideSort column={column} label="Waitlist Status" />
      ),
      cell: ({ row }) => (
        <SelectCell
          value={row.original?.waitingStatus}
          options={WAITLIST_STATUS_CODESET}
          disabled={true}
        />
      ),
    },
    ...(!isManagement
      ? [
          {
            id: 'alert',
            accessorKey: 'alert',
            header: ({ column }: any) => (
              <ColumnHeader clientSideSort column={column} label="Alert" />
            ),
            cell: ({ row }: any) => (
              <TextCell>{row?.original?.isAlertSent ? 'Yes' : 'No'}</TextCell>
            ),
          },
        ]
      : []),
    {
      id: 'actions',
      accessorKey: 'actions',
      header: ({ column }) => <ColumnHeader column={column} label="Actions" />,
      cell: ActionsCell,
      enableSorting: false,
    },
  ]
  return columns
}

export { getWaitlistColumns }
