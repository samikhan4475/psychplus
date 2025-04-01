'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import PillBlock from '../../../shared-blocks/pill-block'

const dementiaOptions = [
  { label: 'Memory Loss', value: 'demMemoryLoss' },
  { label: 'Confusion', value: 'demConfusion' },
  {
    label: 'Difficulty with Activities of Daily Living',
    value: 'demDifficultyWithAdls',
  },
  { label: 'Wandering', value: 'demWandering' },
  { label: 'Agitation', value: 'demAgitation' },
  { label: 'Auditory Hallucinations', value: 'demAh' },
  { label: 'Visual Hallucinations', value: 'demVh' },
  { label: 'Parkinson Symptoms', value: 'demParkinsonSymptoms' },
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
