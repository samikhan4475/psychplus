'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import PillBlock from '../../../shared-blocks/pill-block'

const autismData = {
  title: 'Autism',
  options: [
    { label: 'Late in Talking/Walking etc.', value: 'autDelayedMilestones' },
    { label: 'Same Actions Over and Over', value: 'autRepetitive' },
    { label: 'Losing Skills Already Learned', value: 'autRegression' },
    { label: 'Trouble Talking or Making Friends', value: 'autSocial' },
    { label: 'Strong Likes/Dislikes', value: 'autAversions' },
    { label: 'Hiding True Feelings or Behaviors', value: 'autMasking' },
    { label: 'Big Reactions to Feelings', value: 'autEmotionalDysregulation' },
  ],
}

const AutismBlock = () => {
  const { watch } = useFormContext()
  const selected: string[] = watch('autism') || []

  return (
    <Flex className="w-full" direction="column" gap="2" justify="start">
      <Text className="text-[16px] font-medium text-[#151B4A] lg:text-[18px]">
        {autismData.title}
      </Text>
      <Flex gap="3" wrap="wrap">
        {autismData.options.map((option) => {
          const isSelected = selected.includes(option.value)
          return (
            <PillBlock
              key={option.value}
              data={option}
              isSelected={isSelected}
              formField="autism"
              // complaintValue="ccAutism"
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export default AutismBlock
