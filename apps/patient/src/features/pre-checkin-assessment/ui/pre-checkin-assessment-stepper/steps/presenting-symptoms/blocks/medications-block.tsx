import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import PillBlock from '../../../shared-blocks/pill-block'

const medicationsBlock = [
  {
    id: 99,
    name: 'GI upset',
    isSelected: false,
  },
  {
    id: 100,
    name: 'Sexual SE',
    isSelected: true,
  },
  {
    id: 101,
    name: 'Weight Gain',
    isSelected: false,
  },
  {
    id: 102,
    name: 'Headache',
    isSelected: false,
  },
  {
    id: 103,
    name: 'Rash',
    isSelected: false,
  },
  {
    id: 104,
    name: 'Hairloss',
    isSelected: false,
  },
  {
    id: 105,
    name: 'Dystonia',
    isSelected: false,
  },
  {
    id: 106,
    name: 'Akathisia',
    isSelected: false,
  },
  {
    id: 107,
    name: 'Tardive Dyskinesia',
    isSelected: false,
  },
  {
    id: 108,
    name: 'Blurred Vision',
    isSelected: false,
  },
  {
    id: 109,
    name: 'Drowsiness',
    isSelected: false,
  },
  {
    id: 110,
    name: 'Dizzy',
    isSelected: false,
  },
  {
    id: 111,
    name: 'Others',
    isSelected: false,
  },
]

const MedicationsBlock = () => {
  return (
    <Flex className="w-full" direction="column" gap="2" justify="start">
      <Text className="text-[16px] font-medium text-[#151B4A] lg:text-[18px]">
        Medications SE
      </Text>
      <Flex gap="3" wrap={'wrap'}>
        {medicationsBlock.map((issue) => (
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

export default MedicationsBlock
