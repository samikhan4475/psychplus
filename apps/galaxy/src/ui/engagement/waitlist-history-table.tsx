import React, { useEffect, useState } from 'react'
import { Box, Flex, Heading, ScrollArea } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { DataTable, LoadingPlaceholder } from '@/components'
import { WaitlistResponse } from '@/types'
import { getWaitlistHistoryAction } from './actions/get-waitlist-history-action'
import { getWaitlistHistoryColumns as column } from './history-table-columns'

const WaitlistHistoryTable = ({ id }: { id: number }) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<WaitlistResponse[]>([])

  useEffect(() => {
    setLoading(true)

    getWaitlistHistoryAction({ id }).then((response) => {
      if (response.state === 'error') {
        toast.error(response.error)
      } else if (response.state === 'success') {
        setData(response?.data ?? [])
      }
      setLoading(false)
    })
  }, [id])

  return (
    <Flex direction={'column'}>
      <Heading size={'1'} className="px-2">
        History
      </Heading>
      {loading ? (
        <LoadingPlaceholder className="bg-white min-h-40 h-full" />
      ) : (
        <ScrollArea scrollbars="horizontal" className="p-2">
          <Box className="min-w-max">
            <DataTable
              columns={column()}
              data={data}
              sticky
              theadClass="z-[1]"
              disablePagination
            />
          </Box>
        </ScrollArea>
      )}
    </Flex>
  )
}

export default WaitlistHistoryTable
