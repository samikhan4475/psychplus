'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import PillBlock from '../../../shared-blocks/pill-block'

const bpdOptions = [
  { label: 'Fear of Abandonment', value: 'bpdFearOfAbandonment' },
  { label: 'Unstable Self-Image', value: 'bpdUnstableSelfImage' },
  { label: 'Unstable Relationships', value: 'bpdUnstableRelationships' },
  { label: 'Mood Swings', value: 'bpdMoodSwings' },
  { label: 'Black/White Thinking', value: 'bpdBlackWhiteThinking' },
  { label: 'Impulsiveness', value: 'bpdImpulsiveness' },
  { label: 'Self-Harm', value: 'bpdSelfHarm' },
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
              fontSize="14px"
              rounded={2}
              fontWeight="light"
              bgColor="pp-gray-5"
              formField="bpd"
              complaintValue='ccBpd'
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export default BpdBlock
