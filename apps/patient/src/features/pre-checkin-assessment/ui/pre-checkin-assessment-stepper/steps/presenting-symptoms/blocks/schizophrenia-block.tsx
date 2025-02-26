'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import PillBlock from '../../../shared-blocks/pill-block'

const BLOCK_TITLE = 'Schizophrenia'

const SCHIZOPHRENIA_BLOCK_OPTIONS = [
  {
    label: 'Delusion',
    value: 'schDelusion',
  },
  {
    label: 'Hallucination',
    value: 'schHallucination',
  },
  {
    label: 'Disorganized',
    value: 'schDisorganized',
  },
  {
    label: 'Anhedonia',
    value: 'schAnhedonia',
  },
  {
    label: 'Avolition',
    value: 'schAvolition',
  },
  {
    label: 'Catatonia',
    value: 'schCatatonia',
  },
  {
    label: 'Suicidal Thoughts',
    value: 'schSuicidalThoughts',
  },
  {
    label: 'Homicidal Thoughts',
    value: 'schHomicidalThoughts',
  },
]

const SchizophreniaBlock = () => {
  const { watch } = useFormContext()
  const selected: string[] = watch('schizophrenia') || []

  return (
    <Flex className="w-full" direction="column" gap="2" justify="start">
      <Text className="text-[16px] font-medium text-[#151B4A] lg:text-[18px]">
        {BLOCK_TITLE}
      </Text>
      <Flex gap="3" wrap="wrap">
        {SCHIZOPHRENIA_BLOCK_OPTIONS.map((option) => {
          const isSelected = selected.includes(option.value)
          return (
            <PillBlock
              key={option.value}
              data={option}
              isSelected={isSelected}
              fontSize="14px"
              rounded={2}
              fontWeight="light"
              bgColor="pp-gray-5"
              formField="schizophrenia"
              complaintValue="ccSchizophrenia"
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export default SchizophreniaBlock
