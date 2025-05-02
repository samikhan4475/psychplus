'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import PillBlock from '../../../shared-blocks/pill-block'

const obsessionOptions = [
  { label: 'Fear of Germs or Dirt', value: 'obsContamination' },
  { label: 'Constant Uncertainty', value: 'obsDoubt' },
  { label: 'Worry About Body or Health', value: 'obsSomatic' },
  { label: 'Scary Thoughts of Hurting Others', value: 'obsAggression' },
  { label: 'Unwanted Sexual Thoughts', value: 'obsSexual' },
  { label: 'Checking Things Repeatedly', value: 'obsChecking' },
  { label: 'Washing Hands or Things Too Much', value: 'obsWashing' },
  { label: 'Counting Things Over and Over', value: 'obsCounting' },
  { label: 'Keeping Too Many Things', value: 'obsHoarding' },
  { label: 'Skin or Hair Picking', value: 'obsPicking' },
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
              // complaintValue='ccObsession'
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export default ObsessionBlock
