import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import PillBlock from '../../../shared-blocks/pill-block'

const obsessionBlock = [
  {
    id: 41,
    name: 'contamination',
    isSelected: false,
  },
  {
    id: 42,
    name: 'doubt',
    isSelected: true,
  },
  {
    id: 43,
    name: 'somatic',
    isSelected: false,
  },
  {
    id: 44,
    name: 'aggressive',
    isSelected: false,
  },
  {
    id: 45,
    name: 'sexual',
    isSelected: false,
  },
  {
    id: 46,
    name: 'compulsion',
    isSelected: false,
  },
  {
    id: 47,
    name: 'checking',
    isSelected: false,
  },
  {
    id: 48,
    name: 'washing',
    isSelected: false,
  },
  {
    id: 49,
    name: 'counting',
    isSelected: false,
  },
  {
    id: 50,
    name: 'hoarding',
    isSelected: false,
  },
  {
    id: 51,
    name: 'picking',
    isSelected: false,
  },
]

const ObsessionBlock = () => {
  return (
    <Flex className="w-full" direction="column" gap="2" justify="start">
      <Text className="text-[16px] font-medium text-[#151B4A] lg:text-[18px]">
        Obsession
      </Text>
      <Flex gap="3" wrap={'wrap'}>
        {obsessionBlock.map((issue) => (
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

export default ObsessionBlock
