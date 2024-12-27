import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import PillBlock from '../../../shared-blocks/pill-block'

const substanceBlock = [
  {
    id: 61,
    name: 'Tobacco',
    isSelected: false,
  },
  {
    id: 62,
    name: 'Alcohol',
    isSelected: true,
  },
  {
    id: 63,
    name: 'Opioids',
    isSelected: false,
  },
  {
    id: 64,
    name: 'marijuana',
    isSelected: false,
  },
  {
    id: 65,
    name: 'benzos',
    isSelected: false,
  },
  {
    id: 66,
    name: 'cocaine',
    isSelected: false,
  },
  {
    id: 67,
    name: 'amphetamine',
    isSelected: false,
  },
  {
    id: 68,
    name: 'PCP',
    isSelected: false,
  },
  {
    id: 69,
    name: 'inhalant',
    isSelected: false,
  },
  {
    id: 70,
    name: 'other',
    isSelected: false,
  },
]

const SubstanceBlock = () => {
  return (
    <Flex className="w-full" direction="column" gap="2" justify="start">
      <Text className="text-[16px] font-medium text-[#151B4A] lg:text-[18px]">
        Substance
      </Text>
      <Flex gap="3" wrap={'wrap'}>
        {substanceBlock.map((issue) => (
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

export default SubstanceBlock
