import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import PillBlock from '../../../shared-blocks/pill-block'

const dementiaBlock = [
  {
    id: 91,
    name: 'Memory Loss',
    isSelected: false,
  },
  {
    id: 92,
    name: 'Confusion',
    isSelected: true,
  },
  {
    id: 93,
    name: 'Difficulty with ADLs',
    isSelected: false,
  },
  {
    id: 94,
    name: 'Wandering',
    isSelected: false,
  },
  {
    id: 95,
    name: 'Agitation',
    isSelected: false,
  },
  {
    id: 96,
    name: 'AH',
    isSelected: false,
  },
  {
    id: 97,
    name: 'VH',
    isSelected: false,
  },
  {
    id: 98,
    name: 'Parkinson’s Symptoms',
    isSelected: false,
  },
]

const DementiaBlock = () => {
  return (
    <Flex className="w-full" direction="column" gap="2" justify="start">
      <Text className="text-[16px] font-medium text-[#151B4A] lg:text-[18px]">
        Dementia
      </Text>
      <Flex gap="3" wrap={'wrap'}>
        {dementiaBlock.map((issue) => (
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

export default DementiaBlock
