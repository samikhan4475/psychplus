'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import PillBlock from '../../../shared-blocks/pill-block'

const depressionOptions = [
  { label: 'Low Mood', value: 'depLowMood' },
  { label: 'Trouble Sleeping', value: 'depSleepConcerns' },
  { label: 'Loss of Interest in Activities', value: 'depLowInterest' },
  { label: 'Feeling Guilty', value: 'depGuilt' },
  { label: 'Poor Energy', value: 'depPoorEnergy' },
  { label: 'Poor Concentration', value: 'depPoorConcentration' },
  { label: 'Poor Motivation', value: 'depPoorMotivation' },
  { label: 'Eating More or Less Than Usual', value: 'depAppetiteConcerns' },
  { label: 'Hopeless', value: 'depHopeless' },
  { label: 'Moving or Thinking Slowly', value: 'depSlowing' },
  { label: 'Feeling Restless or On Edge', value: 'depAgitation' },
  { label: 'Thoughts of Ending Life', value: 'depSuicidalThoughts' },
  { label: 'Getting Mad Easily', value: 'depAnger' },
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
