'use client'

import { useEffect, useState } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { historyColumns } from '../service-units/hx-columns'
import { getAllServiceRoomHistoryAction } from './actions'
import { ServiceRoom } from './types'

interface HxListTableProps {
  roomId: string
  locationId: string
}

const HxListTable = ({ roomId, locationId }: HxListTableProps) => {
  const [roomHistoryData, setRoomHistoryData] = useState<ServiceRoom[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getServiceRoomHistory()
  }, [roomId])

  const getServiceRoomHistory = async () => {
    setLoading(true)
    const response = await getAllServiceRoomHistoryAction(locationId, roomId)
    if (response.state === 'success') {
      setRoomHistoryData(response.data)
    }
    setLoading(false)
  }

  if (loading)
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )

  return (
    <ScrollArea className="h-full p-2">
      <DataTable
        data={roomHistoryData ?? []}
        columns={historyColumns}
        disablePagination
        sticky
        isRowSpan
        theadClass="z-[1]"
      />
    </ScrollArea>
  )
}

export { HxListTable }
