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
import { formatUTCDate, getSortDir } from '@/utils'
import { useStore } from './store'
import { PharmacyNotifications } from './types'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<PharmacyNotifications>[] => [
  {
    id: 'patientName',
    accessorKey: 'patientName',
    size: 40,
    minSize: 10,
    maxSize: 300,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => {
          onSort?.(column.id)
        }}
        label="Patient Name"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original?.patientName ?? ''} </TextCell>,
  },
  {
    id: 'medicationName',
    accessorKey: 'medicationName',
    size: 300,
    minSize: 100,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => {
          onSort?.(column.id)
        }}
        label="Medication Name"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original?.medicationName}</TextCell>,
  },
  {
    id: 'pharmacyName',
    accessorKey: 'pharmacyName',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => {
          onSort?.(column.id)
        }}
        label="Pharmacy Name"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original?.pharmacyName}</TextCell>,
  },
  {
    id: 'notificationStatus',
    accessorKey: 'notificationStatus',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => {
          onSort?.(column.id)
        }}
        label="Notification Status"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original?.notificationStatus}</TextCell>,
  },
  {
    id: 'notificationType',
    accessorKey: 'notificationType',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => {
          onSort?.(column.id)
        }}
        label="Notification Type"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original?.notificationType}</TextCell>,
  },
  {
    id: 'notificationStatusDate',
    accessorKey: 'notificationStatusDate',
    size: 50,
    minSize: 10,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => {
          onSort?.(column.id)
        }}
        label="Notification Status Date"
      />
    ),
    cell: ({ row }) => (
      <TextCell>{formatUTCDate(row.original?.notificationStatusDate)}</TextCell>
    ),
  },
]

const PharmacyNotificationsTable = () => {
  const { data, loading, sort, fetch, sortData } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    fetch: state.fetch,
    sort: state.sort,
    sortData: state.sortData,
  }))

  useEffect(() => {
    fetch()
  }, [fetch])
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
        data={data.pharmacyNotifications ?? []}
        columns={columns(sort, sortData)}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { PharmacyNotificationsTable }
