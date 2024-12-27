import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import PillBlock from '../../../shared-blocks/pill-block'

const ptsdBlock = [
  {
    id: 31,
    name: 'traumatic event',
    isSelected: false,
  },
  {
    id: 32,
    name: 'intrusive memories',
    isSelected: true,
  },
  {
    id: 33,
    name: 'nightmares',
    isSelected: false,
  },
  {
    id: 34,
    name: 'night terrors',
    isSelected: false,
  },
  {
    id: 35,
    name: 'flashbacks',
    isSelected: false,
  },
  {
    id: 36,
    name: 'dissociative episodes',
    isSelected: false,
  },
  {
    id: 37,
    name: 'hyper vigilance',
    isSelected: false,
  },
  {
    id: 38,
    name: 'avoidance',
    isSelected: false,
  },
  {
    id: 39,
    name: 'startled',
    isSelected: false,
  },
  {
    id: 40,
    name: 'detachment',
    isSelected: false,
  },
]

const PtsdBlock = () => {
  return (
    <Flex className="w-full" direction="column" gap="2" justify="start">
      <Text className="text-[16px] font-medium text-[#151B4A] lg:text-[18px]">
        PTSD
      </Text>
      <Flex gap="3" wrap={'wrap'}>
        {ptsdBlock.map((issue) => (
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

export default PtsdBlock
