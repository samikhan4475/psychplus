'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import PillBlock from '../../../shared-blocks/pill-block'

const depressionOptions = [
  { label: 'Low Mood', value: 'depLowMood' },
  { label: 'Sleep Concerns', value: 'depSleepConcerns' },
  { label: 'Low Interest', value: 'depLowInterest' },
  { label: 'Guilt', value: 'depGuilt' },
  { label: 'Poor Energy', value: 'depPoorEnergy' },
  { label: 'Poor Concentration', value: 'depPoorConcentration' },
  { label: 'Poor Motivation', value: 'depPoorMotivation' },
  { label: 'Appetite Concerns', value: 'depAppetiteConcerns' },
  { label: 'Hopeless', value: 'depHopeless' },
  { label: 'Slowing', value: 'depSlowing' },
  { label: 'Agitation', value: 'depAgitation' },
  { label: 'Suicidal Thoughts', value: 'depSuicidalThoughts' },
  { label: 'Anger', value: 'depAnger' },
]

const DepressionBlock = () => {
  const { watch } = useFormContext()
  const selected: string[] = watch('depression') || []

  return (
    <Flex className="w-full" direction="column" gap="2" justify="start">
      <Text className="text-[16px] font-medium text-[#151B4A] lg:text-[18px]">
        Depression
      </Text>
      <Flex gap="3" wrap="wrap">
        {depressionOptions.map((option) => {
          const isSelected = selected.includes(option.value)
          return (
            <PillBlock
              key={option.value}
              data={option}
              isSelected={isSelected}
              formField="depression"
              // complaintValue="ccDepression"
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export default DepressionBlock
