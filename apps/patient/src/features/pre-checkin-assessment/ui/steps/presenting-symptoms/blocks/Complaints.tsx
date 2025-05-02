'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import PillBlock from '../../../shared-blocks/pill-block'

type DetailsType = 'text'

interface GroupSelectOption<T> {
  label: string
  value: T
  fieldName?: string
  details?: {
    type: DetailsType
    field: string
    maxLength: number
  }
}

const Complaints = () => {
  const { watch } = useFormContext()
  const selectedComplaints: string[] = watch('chiefComplaint') || []
  const complaintsList: GroupSelectOption<string>[] = [
    createComplaint('Depression', 'ccDepression', 'depression'),
    createComplaint('Anxiety', 'ccAnxiety', 'anxiety'),
    createComplaint('Extreme Mood Swings', 'ccBipolar/Mania', 'bipolarMania'),
    createComplaint('Post-Traumatic Stress', 'ccPtsd', 'ptsd'),
    createComplaint(
      'Unwanted Thoughts & Repetitive Actions',
      'ccObsession',
      'obsession',
    ),
    createComplaint(
      'Strong Mood Swings & Relationship Struggles',
      'ccBpd',
      'bpd',
    ),
    createComplaint('Drug or Alcohol Use', 'ccSubstance', 'substance'),
    createComplaint(
      'Easily Distracted/Daydreaming Type',
      'ccAdhdi',
      'adhdInattentive',
    ),
    createComplaint(
      'Very Active & Impulsive Type',
      'ccAdhdh',
      'adhdHyperactive',
    ),
    createComplaint('Developmental & Social Challenges', 'ccAutism', 'autism'),
    createComplaint(
      'Serious Behavior Problems',
      'ccConductDisorder',
      'conductDisorder',
    ),
    createComplaint('Memory & Thinking Problems', 'ccDementia', 'dementia'),
    createComplaint(
      'Losing Touch with Reality',
      'ccSchizophrenia',
      'schizophrenia',
    ),
    createComplaint(
      'Side Effects of Medication',
      'ccMedicationSe',
      'medicationSe',
    ),
    createComplaint('Other', 'ccOther', undefined, {
      type: 'text',
      field: 'ccOtherDetails',
      maxLength: 500,
    }),
  ]

  return (
    <Flex className="w-full" direction="column" gap="2" justify="start">
      <Text className="text-[16px] font-medium text-[#151B4A] lg:text-[18px]">
        Chief Complaint
      </Text>
      <Flex gap="3" wrap="wrap">
        {complaintsList.map((option) => {
          const isSelected = selectedComplaints.includes(option.value)
          return (
            <PillBlock
              key={option.value}
              data={option}
              isSelected={isSelected}
              formField="chiefComplaint"
            />
          )
        })}
      </Flex>
    </Flex>
  )
}

const createComplaint = (
  label: string,
  value: string,
  fieldName?: string,
  details?: { type: DetailsType; field: string; maxLength: number },
): GroupSelectOption<string> => ({
  label,
  value,
  ...(fieldName ? { fieldName } : {}),
  ...(details ? { details } : {}),
})

export default Complaints
