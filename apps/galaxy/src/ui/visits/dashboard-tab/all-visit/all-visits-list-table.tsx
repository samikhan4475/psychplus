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
import { TableFilters } from '../../constants'
import { AllVisits } from '../../types'
import { useStore } from './store'

const columns = (): ColumnDef<AllVisits>[] => {
  return [
    {
      id: 'visitType',
      header: ({ column }) => <ColumnHeader label="Visit Type" />,
      cell: ({ row }) => <TextCell>{row.original.visitType}</TextCell>,
    },
    {
      id: 'sequence',
      header: () => <ColumnHeader label="Sequence" />,
      cell: ({ row }) => <TextCell>{row.original.visitSequence}</TextCell>,
    },
    {
      id: 'total',
      header: () => <ColumnHeader label="Total" />,
      cell: ({ row }) => <TextCell>{row.original.totalVisits}</TextCell>,
    },
    {
      id: 'active',
      header: () => <ColumnHeader label="Active" />,
      cell: ({ row }) => <TextCell>{row.original.activeVisits}</TextCell>,
    },

    {
      id: 'checkOut',
      header: () => <ColumnHeader label="Check Out" />,
      cell: ({ row }) => <TextCell>{row.original.checkedOutVisits}</TextCell>,
    },
  ]
}

const AllVisitsListTable = () => {
  const { data, search, loading, activeFilter } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    search: state.search,
    activeFilter: state.activeFilter,
  }))

  useEffect(() => {
    let payload: { dateFrom: string; dateTo: string } | undefined
    if (activeFilter === TableFilters.Today) {
      const today = new Date().toISOString().split('T')[0]
      payload = { dateFrom: today, dateTo: today }
    }
    search(payload)
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
        data={data?.allVisits ?? []}
        columns={columns()}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { AllVisitsListTable }
