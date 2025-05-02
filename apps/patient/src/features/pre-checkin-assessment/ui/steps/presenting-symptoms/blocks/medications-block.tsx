'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import PillBlock from '../../../shared-blocks/pill-block'

type DetailsType = 'text'

const medicationsOptions = [
  { label: 'Stomach Issues', value: 'medGiUpset' },
  { label: 'Sexual Problems', value: 'medSexualSe' },
  { label: 'Gaining Weight', value: 'medWeightGain' },
  { label: 'Head Pain', value: 'medHeadache' },
  { label: 'Skin Reaction', value: 'medRash' },
  { label: 'Losing Hair', value: 'medHairLoss' },
  { label: 'Muscle Stiffness or Spasms', value: 'medDystonia' },
  { label: 'Feeling Restless or Need to Move', value: 'medAkathesia' },
  { label: 'Uncontrolled Face/Body Movements', value: 'medTardiveDyskinesia' },
  { label: 'Vision Not Clear', value: 'medBlurredVision' },
  { label: 'Feeling Very Sleepy', value: 'medDrowsiness' },
  { label: 'Feeling Lightheaded', value: 'medDizzy' },
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
              formField="medicationSe"
              // complaintValue="ccMedicationSe"
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

export default MedicationsBlock
