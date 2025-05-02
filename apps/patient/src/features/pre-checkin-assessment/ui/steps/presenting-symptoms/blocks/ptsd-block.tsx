'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import PillBlock from '../../../shared-blocks/pill-block'

const ptsdOptions = [
  { label: 'Bad or Scary Experience', value: 'ptsTraumaticEvent' },
  { label: 'Unwanted Thoughts or Flashbacks', value: 'ptsIntrusiveMemories' },
  { label: 'Nightmares', value: 'ptsNightmares' },
  { label: 'Waking Up Very Scared', value: 'ptsNightTerrors' },
  { label: 'Flashbacks', value: 'ptsFlashbacks' },
  {
    label: 'Feeling Disconnected or “Spaced Out”',
    value: 'ptsDissociativeEpisodes',
  },
  { label: 'Always On Alert', value: 'ptsHypervigilance' },
  { label: 'Avoiding People or Places', value: 'ptsAvoidance' },
  { label: 'Jumping Easily', value: 'ptsStartled' },
  { label: 'Feeling Numb or Emotionally Distant', value: 'ptsDetachment' },
]

const PtsdBlock = () => {
  const { watch } = useFormContext()
  const selected: string[] = watch('ptsd') || []

  return (
    <Flex className="w-full" direction="column" gap="2" justify="start">
      <Text className="text-[16px] font-medium text-[#151B4A] lg:text-[18px]">
        PTSD
      </Text>
      <Flex gap="3" wrap="wrap">
        {ptsdOptions.map((option) => {
          const isSelected = selected.includes(option.value)
          return (
            <PillBlock
              key={option.value}
              data={option}
              isSelected={isSelected}
              formField="ptsd"
              // complaintValue='ccPtsd'
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export default PtsdBlock
