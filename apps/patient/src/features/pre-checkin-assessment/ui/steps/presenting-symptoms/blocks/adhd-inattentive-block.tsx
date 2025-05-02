'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import PillBlock from '../../../shared-blocks/pill-block'

const BLOCK_TITLE = 'ADHD Inattentive'

const BLOCK_OPTIONS = [
  ['Careless Mistakes', 'adiCarelessMistakes'],
  ['Decreased Attention', 'adiDecreasedAttention'],
  ["Doesn't Listen", 'adiDoesntListen'],
  ['Hard to Follow Instruction', 'adiHardToFollowInstruction'],
  ['Messy or Disorganized', 'adiDifficultyOrganizing'],
  ['Avoids Hard Tasks', 'adiDifficultyToDoDetailOrientedTasks'],
  ['Misplaces Items Often', 'adiLosesThings'],
  ['Easily Distracted', 'adiEasilyDistracted'],
  ['Forgets Daily Tasks', 'adiForgetful'],
].map(([label, value]) => ({ label, value }))

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
              formField="adhdInattentive"
              // complaintValue="ccAdhdi"
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export default AdhdInattentiveBlock
