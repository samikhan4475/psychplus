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

const complaintsList: GroupSelectOption<string>[] = [
  {
    label: 'Depression',
    value: 'ccDepression',
    fieldName: 'depression',
  },
  {
    label: 'Anxiety',
    value: 'ccAnxiety',
    fieldName: 'anxiety',
  },
  {
    label: 'Bipolar/Mania',
    value: 'ccBipolar/Mania',
    fieldName: 'bipolarMania',
  },
  {
    label: 'PTSD',
    value: 'ccPtsd',
    fieldName: 'ptsd',
  },
  {
    label: 'Obsession/OCD',
    value: 'ccObsession',
    fieldName: 'obsession',
  },
  {
    label: 'BPD',
    value: 'ccBpd',
    fieldName: 'bpd',
  },
  {
    label: 'Substance',
    value: 'ccSubstance',
    fieldName: 'substance',
  },
  {
    label: 'ADHD Inattentive',
    value: 'ccAdhdi',
    fieldName: 'adhdInattentive',
  },
  {
    label: 'ADHD Hyperactive',
    value: 'ccAdhdh',
    fieldName: 'adhdHyperactive',
  },
  {
    label: 'Autism',
    value: 'ccAutism',
    fieldName: 'autism',
  },
  {
    label: 'Conduct Disorder',
    value: 'ccConductDisorder',
    fieldName: 'conductDisorder',
  },
  {
    label: 'Dementia',
    value: 'ccDementia',
    fieldName: 'dementia',
  },
  {
    label: 'Schizophrenia',
    value: 'ccSchizophrenia',
    fieldName: 'schizophrenia',
  },
  {
    label: 'Medication SE',
    value: 'ccMedicationSe',
    fieldName: 'medicationSe',
  },
  {
    label: 'Other',
    value: 'ccOther',
    details: {
      type: 'text',
      field: 'ccOtherDetails',
      maxLength: 500,
    },
  },
]

const Complaints = () => {
  const { watch } = useFormContext()
  const selectedComplaints: string[] = watch('chiefComplaint') || []

  return (
    <Flex>
      <Text className="w-32 text-[16px] font-medium capitalize text-[#151B4A] lg:text-[18px]">
        Chief Complaint
      </Text>
      <Flex wrap="wrap" gap="3">
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

export default Complaints
