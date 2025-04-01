'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import PillBlock from '../../../shared-blocks/pill-block'

const ptsdOptions = [
  { label: 'Traumatic Event', value: 'ptsTraumaticEvent' },
  { label: 'Intrusive Memories', value: 'ptsIntrusiveMemories' },
  { label: 'Nightmares', value: 'ptsNightmares' },
  { label: 'Night Terrors', value: 'ptsNightTerrors' },
  { label: 'Flashbacks', value: 'ptsFlashbacks' },
  { label: 'Dissociative Episodes', value: 'ptsDissociativeEpisodes' },
  { label: 'Hypervigilance', value: 'ptsHypervigilance' },
  { label: 'Avoidance', value: 'ptsAvoidance' },
  { label: 'Startled', value: 'ptsStartled' },
  { label: 'Detachment', value: 'ptsDetachment' },
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
