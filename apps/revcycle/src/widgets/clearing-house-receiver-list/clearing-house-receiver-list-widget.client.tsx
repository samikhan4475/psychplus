'use client'

import { useEffect, useRef } from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import { GooglePlacesContextProvider } from '@/providers'
import { ClearingHouseReceiverDialogWidgetClient } from '../clearing-house-receiver-dialog'
import { getClearingHouseReceiverList } from './api.client'
import { ReceiverTable } from './components/receiver-table'
import { useStore } from './store'
import { ClearingHouseReceiver, StatesOption } from './types'

const ClearingHouseReceiverListWidgetClient = ({
  googleApiKey,
  usStatesCodeSetsProp,
}: {
  googleApiKey: string
  usStatesCodeSetsProp?: StatesOption[]
}) => {
  const usStatesCodeSetsState = useStore((state) => state.usStatesCodeSets)
  const usStatesCodeSetsData = usStatesCodeSetsProp ?? usStatesCodeSetsState

  const { setClearingHouseReceivers } = useStore((state) => ({
    setClearingHouseReceivers: state.setClearingHouseReceivers,
  }))
  const { setUsStatesCodeSets } = useStore((state) => ({
    setUsStatesCodeSets: state.setUsStatesCodeSets,
  }))
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setUsStatesCodeSets(usStatesCodeSetsData)
    fetchReceiversList()
  }, [])

  const fetchReceiversList = async () => {
    try {
      const clearingHouseList: ClearingHouseReceiver[] =
        await getClearingHouseReceiverList({
          receiverIds: [],
        })
      setClearingHouseReceivers(clearingHouseList)
    } catch (error) {
      setClearingHouseReceivers([])
    }
  }

  return (
    <GooglePlacesContextProvider apiKey={googleApiKey}>
      <Flex direction="column" className="h-fit min-w-fit p-3" ref={ref}>
        <Flex className="border-b-2 border-[#eaeaea] p-1">
          <Box className="flex-1">
            <Text className="font-bold">Receiver</Text>
          </Box>
          <Box className="flex-1">
            <Flex justify="end">
              <ClearingHouseReceiverDialogWidgetClient
                usStatesCodeSets={usStatesCodeSetsData}
              />
            </Flex>
          </Box>
        </Flex>
        <ReceiverTable />
      </Flex>
    </GooglePlacesContextProvider>
  )
}

export { ClearingHouseReceiverListWidgetClient }
