'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import PillBlock from '../../../shared-blocks/pill-block'

const conductDisorderData = {
  title: 'Conduct Disorder',
  options: [
    { label: 'Breaks Rules Often', value: 'cdDisciplineIssues' },
    { label: 'Refuses to Follow Rules', value: 'cdDefiance' },
    { label: 'Likes to Argue', value: 'cdArgumentative' },
    { label: 'VengSeeks Revenge or Holds Grudgeseful', value: 'cdVengeful' },
    { label: 'Lies or Cheats', value: 'cdDeceitful' },
    { label: 'Breaks or Damages Things', value: 'cdDestructive' },
    { label: 'Gets Too Angry Easily', value: 'cdDisproportionateAnger' },
    { label: 'Hurts Animals', value: 'cdAnimalCruelty' },
    { label: 'Tries to Control Others', value: 'cdManipulative' },
    { label: 'Explosive Behavior', value: 'cdSuddenOutbursts' },
  ],
}

const ConductDisorderBlock = () => {
  const { watch } = useFormContext()
  const selected: string[] = watch('conductDisorder') || []

  return (
    <Flex className="w-full" direction="column" gap="2" justify="start">
      <Text className="text-[16px] font-medium text-[#151B4A] lg:text-[18px]">
        {conductDisorderData.title}
      </Text>
      <Flex gap="3" wrap="wrap">
        {conductDisorderData.options.map((option) => {
          const isSelected = selected.includes(option.value)
          return (
            <PillBlock
              key={option.value}
              data={option}
              isSelected={isSelected}
              formField="conductDisorder"
              // complaintValue='ccConductDisorder'
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export default ConductDisorderBlock
