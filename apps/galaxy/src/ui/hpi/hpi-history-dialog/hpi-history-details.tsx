import { filterAndSort } from '@/utils'
import { Flex, Text } from '@radix-ui/themes'
import { useEffect } from 'react'
import { useHpiWidget } from '../hooks'
import AllBlocks from '../hpi-widget/blocks/all-blocks'
import { useHpiHistoryStore } from './store'

export const HpiHistoryDetailsPanel = () => {

  const { selectedHistory } = useHpiHistoryStore()
  const { updateFormValues } = useHpiWidget()
  const [, restData] = filterAndSort(
    (selectedHistory && 'data' in selectedHistory ? selectedHistory.data : []) ?? [],
    'hpiOther'
  )

  useEffect(() => {
    if (selectedHistory) {
      updateFormValues()
    }
  }, [selectedHistory])

  return (
    <Flex direction={'column'} gap="2" maxHeight={'70vh'} className="p-4 pt-0 overflow-auto h-full">
      <Text className="font-bold mb-2 shrink-0">HPI/Presenting Symptoms</Text>
      <Flex direction="column" gap="2" className='grow overflow-auto'>
        <AllBlocks data={restData} disabled />
      </Flex>
    </Flex>
  )
} 