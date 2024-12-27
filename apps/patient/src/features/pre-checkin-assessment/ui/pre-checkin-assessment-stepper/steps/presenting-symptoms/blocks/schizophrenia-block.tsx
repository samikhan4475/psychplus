import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import PillBlock from '../../../shared-blocks/pill-block'

const schizophreniaBlock = [
  {
    id: 51,
    name: 'Paranoid delusions',
    isSelected: false,
  },
  {
    id: 52,
    name: 'auditory hallucinations',
    isSelected: true,
  },
  {
    id: 53,
    name: 'disorganized',
    isSelected: false,
  },
  {
    id: 54,
    name: 'anhedonia',
    isSelected: false,
  },
  {
    id: 55,
    name: 'avolution',
    isSelected: false,
  },
  {
    id: 56,
    name: 'catatonia',
    isSelected: false,
  },
  {
    id: 57,
    name: 'suicidal thoughts',
    isSelected: false,
  },
  {
    id: 58,
    name: 'homicidal thoughts',
    isSelected: false,
  },
]

const SchizophreniaBlock = () => {
  return (
    <Flex className="w-full" direction="column" gap="2" justify="start">
      <Text className="text-[16px] font-medium text-[#151B4A] lg:text-[18px]">
        Schizophrenia
      </Text>
      <Flex gap="3" wrap={'wrap'}>
        {schizophreniaBlock.map((issue) => (
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

export default SchizophreniaBlock
