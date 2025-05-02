'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import PillBlock from '../../../shared-blocks/pill-block'

const bpdOptions = [
  { label: 'Afraid People Will Leave You', value: 'bpdFearOfAbandonment' },
  { label: 'Not Sure Who You Are', value: 'bpdUnstableSelfImage' },
  {
    label: 'Ups and Downs in Relationships',
    value: 'bpdUnstableRelationships',
  },
  { label: 'Quick Emotional Changes', value: 'bpdMoodSwings' },
  { label: 'All or Nothing Thinking', value: 'bpdBlackWhiteThinking' },
  { label: 'Doing Things Without Thinking', value: 'bpdImpulsiveness' },
  { label: 'Hurting Yourself on Purpose', value: 'bpdSelfHarm' },
]

const BpdBlock = () => {
  const { watch } = useFormContext()
  const selected: string[] = watch('bpd') || []

  return (
    <Flex className="w-full" direction="column" gap="2" justify="start">
      <Text className="text-[16px] font-medium text-[#151B4A] lg:text-[18px]">
        BPD (Borderline Personality Disorder)
      </Text>
      <Flex gap="3" wrap="wrap">
        {bpdOptions.map((option) => {
          const isSelected = selected.includes(option.value)
          return (
            <PillBlock
              key={option.value}
              data={option}
              isSelected={isSelected}
              formField="bpd"
              // complaintValue='ccBpd'
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export default BpdBlock
