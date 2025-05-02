'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import PillBlock from '../../../shared-blocks/pill-block'

const dementiaOptions = [
  { label: 'Forgets People or Things', value: 'demMemoryLoss' },
  { label: 'Gets Mixed Up Easily', value: 'demConfusion' },
  {
    label: 'Needs Help with Daily Tasks',
    value: 'demDifficultyWithAdls',
  },
  { label: 'Gets Lost or Roams Around', value: 'demWandering' },
  { label: 'Gets Upset Easily', value: 'demAgitation' },
  { label: 'Hears Things That Aren’t There', value: 'demAh' },
  { label: 'Sees Things That Aren’t There', value: 'demVh' },
  { label: 'Shaky or Stiff Movements', value: 'demParkinsonSymptoms' },
]

const DementiaBlock = () => {
  const { watch } = useFormContext()
  const selected: string[] = watch('dementia') || []

  return (
    <Flex className="w-full" direction="column" gap="2" justify="start">
      <Text className="text-[16px] font-medium text-[#151B4A] lg:text-[18px]">
        Dementia
      </Text>
      <Flex gap="3" wrap="wrap">
        {dementiaOptions.map((option) => {
          const isSelected = selected.includes(option.value)
          return (
            <PillBlock
              key={option.value}
              data={option}
              isSelected={isSelected}
              formField="dementia"
              // complaintValue="ccDementia"
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export default DementiaBlock
