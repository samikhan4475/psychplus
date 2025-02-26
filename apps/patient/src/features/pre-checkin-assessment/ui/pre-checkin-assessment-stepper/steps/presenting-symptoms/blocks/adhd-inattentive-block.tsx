'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import PillBlock from '../../../shared-blocks/pill-block'

const BLOCK_TITLE = 'ADHD Inattentive'

const BLOCK_OPTIONS = [
  { label: 'Careless Mistakes', value: 'adiCarelessMistakes' },
  { label: 'Decreased Attention', value: 'adiDecreasedAttention' },
  { label: "Doesn't Listen", value: 'adiDoesntListen' },
  { label: 'Hard to Follow Instruction', value: 'adiHardToFollowInstruction' },
  { label: 'Difficulty Organizing', value: 'adiDifficultyOrganizing' },
  {
    label: 'Difficulty to do Detail Oriented Tasks',
    value: 'adiDifficultyToDoDetailOrientedTasks',
  },
  { label: 'Loses Things', value: 'adiLosesThings' },
  { label: 'Easily Distracted', value: 'adiEasilyDistracted' },
  { label: 'Forgetful', value: 'adiForgetful' },
]

const AdhdInattentiveBlock = () => {
  const { watch } = useFormContext()
  const selected: string[] = watch('adhdInattentive') || []

  return (
    <Flex className="w-full" direction="column" gap="2" justify="start">
      <Text className="text-[16px] font-medium text-[#151B4A] lg:text-[18px]">
        {BLOCK_TITLE}
      </Text>
      <Flex gap="3" wrap="wrap">
        {BLOCK_OPTIONS.map((option) => {
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
              formField="adhdInattentive"
              complaintValue="ccAdhdi"
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export default AdhdInattentiveBlock
