'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { DetailsType } from '@/components-v2/selectable-chip-details'
import PillBlock from '../../../shared-blocks/pill-block'

const substanceOptions = [
  { label: 'Smoking or Chewing Tobacco', value: 'subTobacco' },
  { label: 'Drinking Too Much Alcohol', value: 'subAlcohol' },
  { label: 'Pain Medications Like Oxycodone', value: 'subOpioids' },
  { label: 'Weed/Cannabis', value: 'subMarijuana' },
  { label: 'Anxiety Pills', value: 'subBenzos' },
  { label: 'Cocaine', value: 'subCocaine' },
  { label: 'Stimulant Like Adderall or Meth', value: 'subAmphetamine' },
  { label: 'Hallucinogen', value: 'subPcp' },
  { label: 'Sniffing Chemicals or Gases', value: 'subInhalant' },
  {
    label: 'Other',
    value: 'subOther',
    details: {
      type: 'text' as DetailsType,
      field: 'subOtherDetails',
      maxLength: 500,
    },
  },
]

const SubstanceBlock = () => {
  const { watch } = useFormContext()
  const selected: string[] = watch('substance') || []

  return (
    <Flex className="w-full" direction="column" gap="2" justify="start">
      <Text className="text-[16px] font-medium text-[#151B4A] lg:text-[18px]">
        Substance
      </Text>
      <Flex gap="3" wrap="wrap">
        {substanceOptions.map((option) => {
          const isSelected = selected.includes(option.value)
          return (
            <PillBlock
              key={option.value}
              data={option}
              isSelected={isSelected}
              formField="substance"
              // complaintValue='ccSubstance'
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export default SubstanceBlock
