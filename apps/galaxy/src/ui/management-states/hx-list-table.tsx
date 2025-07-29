'use client'

import { useEffect, useState } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { SelectOptionType } from '@/types'
import { formatDateTime } from '@/utils'
import { getPrimaryVirtualLocationHistoryAction } from './actions'
import { PrimaryLocation } from './types'

interface HxListTableProps {
  stateCode: string
  location: SelectOptionType[]
}

const columns: ColumnDef<PrimaryLocation>[] = [
  {
    id: 'date',
    accessorKey: 'metadata.updatedOn',
    header: ({ column }) => (
      <ColumnHeader label="Date/Time" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => (
      <TextCell>
        {row.original.metadata?.updatedOn
          ? formatDateTime(row.original.metadata?.updatedOn)
          : row.original.metadata?.createdOn &&
            formatDateTime(row.original.metadata?.createdOn)}
      </TextCell>
    ),
  },
  {
    id: 'user',
    accessorKey: 'metadata.createdByFullName',
    header: ({ column }) => (
      <ColumnHeader label="User Name" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original?.metadata?.createdByFullName}</TextCell>
    ),
  },
  {
    id: 'locationName',
    accessorKey: 'locationName',
    header: ({ column }) => (
      <ColumnHeader label="Location" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => <TextCell>{row.original.locationName}</TextCell>,
  },
]

const HxListTable = ({ stateCode, location }: HxListTableProps) => {
  const [data, setData] = useState<PrimaryLocation[]>([])
  const [loading, setLoading] = useState(true)

  const getLocationName = (locationId: string) => {
    const foundLocation = location.find((loc) => loc.value === locationId)
    return foundLocation ? foundLocation.label : ''
  }

  useEffect(() => {
    init()
  }, [stateCode])

  const init = async () => {
    setLoading(true)
    const response = await getPrimaryVirtualLocationHistoryAction(stateCode)
    if (response.state === 'success') {
      const updatedData = response.data.map((item: PrimaryLocation) => {
        return {
          ...item,
          locationName: getLocationName(item.locationId),
        }
      })
      setData(updatedData)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <ScrollArea className="h-full p-2">
      <DataTable
        data={data ?? []}
        columns={columns}
        disablePagination
        sticky
        isRowSpan
        theadClass="z-[1]"
      />
    </ScrollArea>
  )
}

export { HxListTable }
