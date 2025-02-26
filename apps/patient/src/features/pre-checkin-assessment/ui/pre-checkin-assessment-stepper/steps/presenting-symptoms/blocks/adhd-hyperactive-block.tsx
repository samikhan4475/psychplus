'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import PillBlock from '../../../shared-blocks/pill-block'

const hyperactiveOptions = [
  { label: 'Fidgeting', value: 'adhFidgeting' },
  { label: 'Leaves Assigned Space', value: 'adhLeavesAssignedSpace' },
  { label: 'Restless', value: 'adhRestless' },
  { label: 'Hard to Enjoy Relaxing', value: 'adhHardToEnjoyRelaxing' },
  { label: 'On the Go', value: 'adhOnTheGo' },
  { label: 'Excessive Talking', value: 'adhExcessiveTalking' },
  { label: 'Blurt Out Answers', value: 'adhBlurtsOutAnswers' },
  { label: 'Impatient', value: 'adhImpatient' },
  { label: 'Interrupts', value: 'adhInterrupts' },
  { label: 'Behavior Outbursts', value: 'adhBehaviorOutbursts' },
]

const AdhdHyperactiveBlock = () => {
  const { watch } = useFormContext()
  const selected: string[] = watch('adhdHyperactive') || []

  return (
    <Flex className="w-full" direction="column" gap="2" justify="start">
      <Text className="text-[16px] font-medium text-[#151B4A] lg:text-[18px]">
        ADHD Hyperactive
      </Text>
      <Flex gap="3" wrap="wrap">
        {hyperactiveOptions.map((option) => {
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
              formField="adhdHyperactive"
              complaintValue='ccAdhdh'
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export default AdhdHyperactiveBlock
