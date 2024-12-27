import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import PillBlock from '../../../shared-blocks/pill-block'

const hyperactiveBlock = [
  {
    id: 81,
    name: 'Fidgeting',
    isSelected: false,
  },
  {
    id: 82,
    name: 'Leaves assigned space',
    isSelected: true,
  },
  {
    id: 83,
    name: 'Restless',
    isSelected: false,
  },
  {
    id: 84,
    name: 'Hard to enjoy relaxing',
    isSelected: false,
  },
  {
    id: 85,
    name: 'On the go',
    isSelected: false,
  },
  {
    id: 86,
    name: 'Excessive talking',
    isSelected: false,
  },
  {
    id: 87,
    name: 'Blurt out answers',
    isSelected: false,
  },
  {
    id: 88,
    name: 'Impatient',
    isSelected: false,
  },
  {
    id: 89,
    name: 'Interrupts',
    isSelected: false,
  },
  {
    id: 90,
    name: 'Behavior outbursts',
    isSelected: false,
  },
]

const HyperactiveBlock = () => {
  return (
    <Flex className="w-full" direction="column" gap="2" justify="start">
      <Text className="text-[16px] font-medium text-[#151B4A] lg:text-[18px]">
        ADHD Hyperactive
      </Text>
      <Flex gap="3" wrap={'wrap'}>
        {hyperactiveBlock.map((issue) => (
          <PillBlock
            data={issue}
            fontSize={'14px'}
            rounded={2}
            key={issue.name}
            fontWeight="light"
            bgColor="pp-gray-5"
          />
        ))}
      </Flex>
    </Flex>
  )
}

export default HyperactiveBlock
