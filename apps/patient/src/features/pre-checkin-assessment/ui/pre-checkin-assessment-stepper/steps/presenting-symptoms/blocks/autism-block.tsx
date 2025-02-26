'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import PillBlock from '../../../shared-blocks/pill-block'

const autismData = {
  title: 'Autism',
  options: [
    { label: 'Delayed Milestones', value: 'autDelayedMilestones' },
    { label: 'Repetitive/Restrictive Behaviors', value: 'autRepetitive' },
    { label: 'Regression', value: 'autRegression' },
    { label: 'Social/Communication Issues', value: 'autSocial' },
    { label: 'Aversions/Special Interests', value: 'autAversions' },
    { label: 'Masking', value: 'autMasking' },
    { label: 'Emotional Dysregulations', value: 'autEmotionalDysregulation' },
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
              fontSize="14px"
              rounded={2}
              fontWeight="light"
              bgColor="pp-gray-5"
              formField="autism"
              complaintValue="ccAutism"
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export default AutismBlock
