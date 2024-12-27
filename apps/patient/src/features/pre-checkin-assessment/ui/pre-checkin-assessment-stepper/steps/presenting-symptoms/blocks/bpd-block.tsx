import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import PillBlock from '../../../shared-blocks/pill-block'

const bpdBlock = [
  {
    id: 46,
    name: 'Fear of abandonment',
    isSelected: false,
  },
  {
    id: 47,
    name: 'Unstable self-image',
    isSelected: true,
  },
  {
    id: 48,
    name: 'Unstable relationships',
    isSelected: false,
  },
  {
    id: 49,
    name: 'Mood swings',
    isSelected: false,
  },
  {
    id: 50,
    name: 'Black/White thinking',
    isSelected: false,
  },
  {
    id: 51,
    name: 'Impulsiveness',
    isSelected: false,
  },
  {
    id: 52,
    name: 'Self harm',
    isSelected: false,
  },
]

const BpdBlock = () => {
  return (
    <Flex className="w-full" direction="column" gap="2" justify="start">
      <Text className="text-[16px] font-medium text-[#151B4A] lg:text-[18px]">
        BPD (Borderline Personality Disorder)
      </Text>
      <Flex gap="3" wrap={'wrap'}>
        {bpdBlock.map((issue) => (
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

export default BpdBlock
