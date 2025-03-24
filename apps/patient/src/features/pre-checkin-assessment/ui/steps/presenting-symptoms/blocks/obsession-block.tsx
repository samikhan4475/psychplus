'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import PillBlock from '../../../shared-blocks/pill-block'

const obsessionOptions = [
  { label: 'Contamination', value: 'obsContamination' },
  { label: 'Doubt', value: 'obsDoubt' },
  { label: 'Somatic', value: 'obsSomatic' },
  { label: 'Aggression', value: 'obsAggression' },
  { label: 'Sexual', value: 'obsSexual' },
  { label: 'Checking', value: 'obsChecking' },
  { label: 'Washing', value: 'obsWashing' },
  { label: 'Counting', value: 'obsCounting' },
  { label: 'Hoarding', value: 'obsHoarding' },
  { label: 'Picking', value: 'obsPicking' },
]

const ObsessionBlock = () => {
  const { watch } = useFormContext()
  const selected: string[] = watch('obsession') || []

  return (
    <Flex className="w-full" direction="column" gap="2" justify="start">
      <Text className="text-[16px] font-medium text-[#151B4A] lg:text-[18px]">
        Obsession
      </Text>
      <Flex gap="3" wrap="wrap">
        {obsessionOptions.map((option) => {
          const isSelected = selected.includes(option.value)
          return (
            <PillBlock
              key={option.value}
              data={option}
              isSelected={isSelected}
              formField="obsession"
              complaintValue='ccObsession'
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export default ObsessionBlock
