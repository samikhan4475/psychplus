'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import PillBlock from '../../../shared-blocks/pill-block'

const anxietyOptions = [
  { label: 'Feeling Anxious', value: 'anxFeelingAnxious' },
  { label: 'Worrying', value: 'anxWorrying' },
  { label: 'Restless', value: 'anxRestless' },
  { label: 'Fatigue', value: 'anxFatigue' },
  { label: 'Muscle Tension', value: 'anxMuscleTension' },
  { label: 'Irritable', value: 'anxIrritable' },
  { label: 'Social Anxiety', value: 'anxSocialAnxiety' },
  { label: 'Panic Attacks', value: 'anxPanicAttacks' },
  { label: 'Phobia', value: 'anxPhobia' },
  { label: 'Abnormal Fear', value: 'anxAbnormalFear' },
]

const AnxietyBlock = () => {
  const { watch } = useFormContext()
  const selected: string[] = watch('anxiety') || []

  return (
    <Flex className="w-full" direction="column" gap="2" justify="start">
      <Text className="text-[16px] font-medium text-[#151B4A] lg:text-[18px]">
        Anxiety
      </Text>
      <Flex gap="3" wrap="wrap">
        {anxietyOptions.map((option) => {
          const isSelected = selected.includes(option.value)
          return (
            <PillBlock
              key={option.value}
              data={option}
              isSelected={isSelected}
              formField="anxiety"
              complaintValue="ccAnxiety"
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export default AnxietyBlock
