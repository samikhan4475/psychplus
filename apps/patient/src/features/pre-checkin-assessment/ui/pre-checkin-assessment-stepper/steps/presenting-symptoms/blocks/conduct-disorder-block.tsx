'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import PillBlock from '../../../shared-blocks/pill-block'

const conductDisorderData = {
  title: 'Conduct Disorder',
  options: [
    { label: 'Discipline Issues', value: 'cdDisciplineIssues' },
    { label: 'Defiance', value: 'cdDefiance' },
    { label: 'Argumentative', value: 'cdArgumentative' },
    { label: 'Vengeful', value: 'cdVengeful' },
    { label: 'Deceitful', value: 'cdDeceitful' },
    { label: 'Destructive', value: 'cdDestructive' },
    { label: 'Disproportionate Anger', value: 'cdDisproportionateAnger' },
    { label: 'Animal Cruelty', value: 'cdAnimalCruelty' },
    { label: 'Manipulative', value: 'cdManipulative' },
    { label: 'Sudden Outbursts', value: 'cdSuddenOutbursts' },
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
              complaintValue='ccConductDisorder'
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export default ConductDisorderBlock
