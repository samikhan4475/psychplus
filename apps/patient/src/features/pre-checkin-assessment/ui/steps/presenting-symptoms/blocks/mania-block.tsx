'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import PillBlock from '../../../shared-blocks/pill-block'

const maniaOptions = [
  { label: 'Feeling Too Good or “High”', value: 'manElevatedMood' },
  { label: 'Easily Distracted', value: 'manDistractibility' },
  { label: 'Over-Focused on Tasks or Projects', value: 'manGoalDirected' },
  {
    label: 'Unrealistic Beliefs About Yourself',
    value: 'manGrandioseDelusions',
  },
  { label: 'Thoughts Jump Quickly', value: 'manFlightOfIdeas' },
  { label: 'Lack of Sleep', value: 'manLackOfSleep' },
  { label: 'Talking Too Fast', value: 'manPressuredSpeech' },
  {
    label: 'Doing Risky Things Without Thinking',
    value: 'manImpulsiveRecklessBehavior',
  },
]

const ManiaBlock = () => {
  const { watch } = useFormContext()
  const selected: string[] = watch('bipolarMania') || []

  return (
    <Flex className="w-full" direction="column" gap="2" justify="start">
      <Text className="text-[16px] font-medium text-[#151B4A] lg:text-[18px]">
        Bipolar/Mania
      </Text>
      <Flex gap="3" wrap="wrap">
        {maniaOptions.map((option) => {
          const isSelected = selected.includes(option.value)
          return (
            <PillBlock
              key={option.value}
              data={option}
              isSelected={isSelected}
              formField="bipolarMania"
              // complaintValue='ccBipolar/Mania'
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export default ManiaBlock
