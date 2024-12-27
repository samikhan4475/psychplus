import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import PillBlock from '../../../shared-blocks/pill-block'

const maniaBlock = [
  {
    id: 21,
    name: 'Elevated mood',
    isSelected: false,
  },
  {
    id: 22,
    name: 'Distractibility',
    isSelected: true,
  },
  {
    id: 23,
    name: 'Goal Directed',
    isSelected: false,
  },
  {
    id: 24,
    name: 'Grandiose Delusions',
    isSelected: false,
  },
  {
    id: 243,
    name: 'Fight of Ideas',
    isSelected: false,
  },
  {
    id: 25,
    name: 'Lack of Sleep',
    isSelected: false,
  },
  {
    id: 27,
    name: 'Pressured Speech',
    isSelected: false,
  },
  {
    id: 28,
    name: 'Impulsive/Reckless Behaviour',
    isSelected: false,
  },
]

const ManiaBlock = () => {
  return (
    <Flex className="w-full" direction="column" gap="2" justify="start">
      <Text className="text-[16px] font-medium text-[#151B4A] lg:text-[18px]">
        Mania
      </Text>
      <Flex gap="3" wrap={'wrap'}>
        {maniaBlock.map((issue) => (
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

export default ManiaBlock
