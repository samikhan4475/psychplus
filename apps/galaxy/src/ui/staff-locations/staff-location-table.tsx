'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import {
  ColumnHeader,
  DataTable,
  DateTimeCell,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { Sort } from '@/types'
import { formatDate, getSortDir } from '@/utils'
import { getScriptSurePermissionAction } from './actions/get-scriptsure-permission-action'
import {
  ActionsCell,
  ServiceCell,
  ServiceLevelsCell,
  StatusCell,
} from './cells'
import { useStore } from './store'
import { StaffLocation } from './types'

const columns = (
  refreshData: () => void,
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<StaffLocation>[] => {
  return [
    {
      id: 'locationName',
      header: ({ column }) => (
        <ColumnHeader
          label="Name"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.location?.name}</TextCell>,
    },
    {
      id: 'type',
      header: ({ column }) => (
        <ColumnHeader
          label="Type"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original?.location?.locationType}</TextCell>
      ),
    },
    {
      id: 'service',
      header: ({ column }) => (
        <ColumnHeader
          label="Service"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ServiceCell,
    },
    {
      id: 'npi',
      header: ({ column }) => (
        <ColumnHeader
          label="NPI"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.location?.npi}</TextCell>,
    },
    {
      id: 'serviceLevelCodes',
      header: ({ column }) => (
        <ColumnHeader
          label="Service Levels"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ServiceLevelsCell,
    },
    {
      id: 'address',
      header: ({ column }) => (
        <ColumnHeader
          label="Address"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => {
        if (row.original?.location?.address) {
          const { street1, street2, postalCode } = row.original.location.address
          return (
            <TextCell className="w-[240px]">{`${street1 ?? ''}, ${
              street2 ?? ''
            }, ${postalCode ?? ''}`}</TextCell>
          )
        }
      },
    },
    {
      id: 'phone',
      header: ({ column }) => (
        <ColumnHeader
          label="Phone"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.location?.phone?.number}</TextCell>
      ),
    },
    {
      id: 'fax',
      header: ({ column }) => (
        <ColumnHeader
          label="Fax"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.location?.fax?.number}</TextCell>
      ),
    },

    {
      id: 'externalProviderId',
      header: ({ column }) => (
        <ColumnHeader
          label="SPI"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original?.externalProviderId}</TextCell>
      ),
    },
    {
      id: 'activeStartTime',
      header: ({ column }) => (
        <ColumnHeader
          label="Start Date"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) =>
        row.original.externalProviderId ? (
          <DateTimeCell>
            {formatDate(row.original?.activeStartTime)}
          </DateTimeCell>
        ) : null,
    },
    {
      id: 'activeEndTime',
      header: ({ column }) => (
        <ColumnHeader
          label="End Date"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) =>
        row.original.externalProviderId ? (
          <DateTimeCell>{formatDate(row.original?.activeEndTime)}</DateTimeCell>
        ) : null,
    },
    {
      id: 'status',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          className="w-full"
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          label="Status"
        />
      ),
      cell: StatusCell,
    },
    {
      id: 'action',
      header: () => <ColumnHeader label="Action" />,
      cell: ({ row }) => <ActionsCell row={row} refreshData={refreshData} />,
    },
  ]
}

const StaffLocationTable = ({ staffId }: { staffId: string }) => {
  const { data, search, loading, sort, sortData, setSureScriptEnabled } =
    useStore((state) => ({
      setSureScriptEnabled: state.setSureScriptEnabled,
      data: state.data,
      loading: state.loading,
      search: state.search,
      sort: state.sort,
      sortData: state.sortData,
    }))

  useEffect(() => {
    ;(async () => {
      const result = await getScriptSurePermissionAction()
      if (result.state === 'success') {
        setSureScriptEnabled(result.data)
      } else if (result.state === 'error') {
        toast.error(result.error)
      }
    })()

    if (staffId && typeof staffId === 'string') search({ staffId })
  }, [])

  const refreshData = () => {
    if (staffId && typeof staffId === 'string') {
      useStore.setState({ pageCache: {} })
      search({ staffId }, 1, true)
    }
  }

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <ScrollArea className="h-full flex-1 p-2 pt-0">
      <DataTable
        data={data?.staffLocations ?? []}
        columns={columns(refreshData, sort, sortData)}
        disablePagination
        sticky
        theadClass="z-[1]"
      />
    </ScrollArea>
  )
}

export { StaffLocationTable }
