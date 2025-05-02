'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import PillBlock from '../../../shared-blocks/pill-block'

const hyperactiveOptions = [
  { label: 'Can’t Stay Still', value: 'adhFidgeting' },
  { label: 'Gets Up When Shouldn’t', value: 'adhLeavesAssignedSpace' },
  { label: 'Feels Like Moving All the Time', value: 'adhRestless' },
  { label: 'Can’t Sit and Relax', value: 'adhHardToEnjoyRelaxing' },
  { label: 'Always Active', value: 'adhOnTheGo' },
  { label: 'Talks a Lot', value: 'adhExcessiveTalking' },
  { label: 'Interrupts or Talks Over Others', value: 'adhBlurtsOutAnswers' },
  { label: 'Can’t Wait', value: 'adhImpatient' },
  {
    label: 'InterruptsCuts People Off in Conversation',
    value: 'adhInterrupts',
  },
  { label: 'Sudden Anger or Actions', value: 'adhBehaviorOutbursts' },
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
              formField="adhdHyperactive"
              // complaintValue='ccAdhdh'
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export default AdhdHyperactiveBlock
