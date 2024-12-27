import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import PillBlock from '../../../shared-blocks/pill-block'

const inattentiveBlock = [
  {
    id: 71,
    name: 'Careless mistakes',
    isSelected: false,
  },
  {
    id: 72,
    name: 'Decreased attention',
    isSelected: true,
  },
  {
    id: 73,
    name: 'Doesnt Listen',
    isSelected: false,
  },
  {
    id: 74,
    name: 'Hard to follow instructions',
    isSelected: false,
  },
  {
    id: 75,
    name: 'Difficult organizing',
    isSelected: false,
  },
  {
    id: 76,
    name: 'Difficult to do detail oriented tasks',
    isSelected: false,
  },
  {
    id: 77,
    name: 'Looses things',
    isSelected: false,
  },
  {
    id: 78,
    name: 'Easily Distracted',
    isSelected: false,
  },
  {
    id: 79,
    name: 'Forgetful',
    isSelected: false,
  }
]

const InattentiveBlock = () => {
  return (
    <Flex className="w-full" direction="column" gap="2" justify="start">
      <Text className="text-[16px] font-medium text-[#151B4A] lg:text-[18px]">
        ADHD Inattentive
      </Text>
      <Flex gap="3" wrap={'wrap'}>
        {inattentiveBlock.map((issue) => (
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

export default InattentiveBlock
