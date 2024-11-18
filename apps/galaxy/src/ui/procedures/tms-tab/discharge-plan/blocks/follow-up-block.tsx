import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { GroupSelectSection } from '@/components'

const BLOCK_ID = 'followUpBlock'
const BLOCK_OPTIONS = [
  {
    label: 'PHQ-9',
    value: 'PHQ-9',
  },
  {
    label: 'PHQ-2',
    value: 'PHQ-2',
  },
  {
    label: 'HAM-D',
    value: 'HAM-D',
  },
  {
    label: 'BDI',
    value: 'BDI',
  },
  {
    label: 'GDS',
    value: 'GDS',
  },
]
const FollowUpBlock = () => {
  return (
    <Flex align={'center'} gap={'2'}>
      <Text className="text-2 font-medium">Follow Up Assessment Screening</Text>
      <GroupSelectSection label="" field={BLOCK_ID} options={BLOCK_OPTIONS} />
    </Flex>
  )
}

export default FollowUpBlock
