import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import PillBlock from '../../../shared-blocks/pill-block'

const anxietyBlock = [
  {
    id: 11,
    name: 'Feeling Anxious',
    isSelected: false,
  },
  {
    id: 12,
    name: 'Worrying',
    isSelected: true,
  },
  {
    id: 13,
    name: 'Restless',
    isSelected: false,
  },
  {
    id: 14,
    name: 'Fatigue',
    isSelected: false,
  },
  {
    id: 15,
    name: 'Muscle Tension',
    isSelected: false,
  },
  {
    id: 16,
    name: 'Irritable',
    isSelected: false,
  },
  {
    id: 17,
    name: 'Social anxiety',
    isSelected: false,
  },
  {
    id: 18,
    name: 'panic attacks',
    isSelected: false,
  },
  {
    id: 19,
    name: 'abnormal fears',
    isSelected: false,
  },
  {
    id: 20,
    name: 'Phobia',
    isSelected: false,
  },
]

const AnxietyBlock = () => {
  return (
    <Flex className="w-full" direction="column" gap="2" justify="start">
      <Text className="text-[16px] font-medium text-[#151B4A] lg:text-[18px]">
        Anxiety
      </Text>
      <Flex gap="3" wrap={'wrap'}>
        {anxietyBlock.map((issue) => (
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

export default AnxietyBlock
