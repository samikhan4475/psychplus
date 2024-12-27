import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import PillBlock from '../../../shared-blocks/pill-block'

const depressionBlock = [
  {
    id: 1,
    name: 'Low Mood',
    isSelected: false,
  },
  {
    id: 2,
    name: 'Sleep concerns',
    isSelected: true,
  },
  {
    id: 3,
    name: 'Low interest',
    isSelected: false,
  },
  {
    id: 4,
    name: 'Guilt',
    isSelected: false,
  },
  {
    id: 232,
    name: 'Poor energy',
    isSelected: false,
  },
  {
    id: 5,
    name: 'poor motivation',
    isSelected: false,
  },
  {
    id: 6,
    name: 'appetite concerns',
    isSelected: false,
  },
  {
    id: 7,
    name: 'Hopeless',
    isSelected: false,
  },
  {
    id: 8,
    name: 'Slowing',
    isSelected: false,
  },
  {
    id: 9,
    name: 'Agitation',
    isSelected: false,
  },
  {
    id: 10,
    name: 'Suicidal thoughts',
    isSelected: false,
  },
  {
    id: 11,
    name: 'anger',
    isSelected: false,
  }
]

const DepressionBlock = () => {
  return (
    <Flex className="w-full" direction="column" gap="2" justify="start">
      <Text className="text-[16px] font-medium text-[#151B4A] lg:text-[18px]">
        Depression
      </Text>
      <Flex gap="3" wrap={'wrap'}>
        {depressionBlock.map((issue) => (
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

export default DepressionBlock
