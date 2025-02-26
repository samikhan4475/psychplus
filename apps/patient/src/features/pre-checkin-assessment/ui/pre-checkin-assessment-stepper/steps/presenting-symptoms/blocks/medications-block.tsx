'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import PillBlock from '../../../shared-blocks/pill-block'

type DetailsType = 'text'

const medicationsOptions = [
  { label: 'GI Upset', value: 'medGiUpset' },
  { label: 'Sexual SE', value: 'medSexualSe' },
  { label: 'Weight Gain', value: 'medWeightGain' },
  { label: 'Headache', value: 'medHeadache' },
  { label: 'Rash', value: 'medRash' },
  { label: 'Hair loss', value: 'medHairLoss' },
  { label: 'Dystonia', value: 'medDystonia' },
  { label: 'Akathesia', value: 'medAkathesia' },
  { label: 'Tardive Dyskinesia', value: 'medTardiveDyskinesia' },
  { label: 'Blurred Vision', value: 'medBlurredVision' },
  { label: 'Drowsiness', value: 'medDrowsiness' },
  { label: 'Dizzy', value: 'medDizzy' },
  {
    label: 'Other',
    value: 'medOther',
    details: {
      type: 'text' as DetailsType,
      field: 'medOtherDetails',
      maxLength: 500,
    },
  },
]

const MedicationsBlock = () => {
  const { watch } = useFormContext()
  const selected: string[] = watch('medicationSe') || []

  return (
    <Flex className="w-full" direction="column" gap="2" justify="start">
      <Text className="text-[16px] font-medium text-[#151B4A] lg:text-[18px]">
        Medications SE
      </Text>
      <Flex gap="3" wrap="wrap">
        {medicationsOptions.map((option) => {
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
              formField="medicationSe"
              complaintValue="ccMedicationSe"
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export default MedicationsBlock
