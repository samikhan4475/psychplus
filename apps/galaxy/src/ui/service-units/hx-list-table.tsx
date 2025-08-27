'use client'

import { useEffect, useState } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { getAllServiceUnitHistoryAction } from './actions'
import { historyColumns } from './hx-columns'
import { ServiceUnit } from './types'

interface HxListTableProps {
  unitId: string
  locationId: string
}

const HxListTable = ({ unitId, locationId }: HxListTableProps) => {
  const [historyData, setHistoryData] = useState<ServiceUnit[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUnitHistory()
  }, [unitId])

  const getUnitHistory = async () => {
    setLoading(true)
    const response = await getAllServiceUnitHistoryAction(locationId, unitId)
    if (response.state === 'success') {
      setHistoryData(response.data)
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
        data={historyData ?? []}
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
