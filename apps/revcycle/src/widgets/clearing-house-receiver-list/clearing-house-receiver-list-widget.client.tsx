'use client'

import { useEffect, useRef, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { getClearingHouseReceiverList } from './api'
import { ReceiverTable } from './components/receiver-table'
import { Preloader } from './preloader'
import { useStore } from './store'
import { ClearingHouseReceiver } from './types'

const ClearingHouseReceiverListWidgetClient = () => {
  const { setClearingHouseReceivers } = useStore((state) => ({
    setClearingHouseReceivers: state.setClearingHouseReceivers,
  }))
  const [isLoading, setIsLoading] = useState(true)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchReceiversList()
  }, [])

  const fetchReceiversList = async () => {
    try {
      const clearingHouseList: ClearingHouseReceiver[] =
        await getClearingHouseReceiverList({
          receiverIds: [],
        })
      setClearingHouseReceivers(clearingHouseList)
      setIsLoading(false)
    } catch (error) {
      setClearingHouseReceivers([])
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading ? (
        <Preloader isLoadingOn={isLoading} />
      ) : (
        <Flex direction="column" className="h-fit min-w-fit" ref={ref}>
          <ReceiverTable />
        </Flex>
      )}
    </>
  )
}

export { ClearingHouseReceiverListWidgetClient }
