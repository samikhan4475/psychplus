import React, { useState } from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'

interface ReviewOption {
  id: number
  label: string
  isSelected: boolean
}
interface ReviewSystem {
  id: number
  title: string
  options: ReviewOption[]
}

const reviewSystems: ReviewSystem[] = [
  {
    id: 1,
    title: 'Constitutional',
    options: [
      { id: 1, label: 'No concerns', isSelected: false },
      { id: 2, label: 'Weight change', isSelected: true },
      { id: 3, label: 'Fever', isSelected: false },
      { id: 4, label: 'Chills', isSelected: false },
      { id: 5, label: 'Fatigue', isSelected: false },
      { id: 6, label: 'Other', isSelected: false },
    ],
  },
  {
    id: 2,
    title: 'ENT/Mouth',
    options: [
      { id: 1, label: 'No concerns', isSelected: false },
      { id: 2, label: 'Hearing Changes/Ear Pain', isSelected: true },
      { id: 3, label: 'Sinus congestion', isSelected: false },
      { id: 4, label: 'Sore Throat', isSelected: false },
      { id: 5, label: 'Other', isSelected: false },
    ],
  },
  {
    id: 3,
    title: 'Eyes',
    options: [
      { id: 1, label: 'No concerns', isSelected: false },
      { id: 2, label: 'Eye Pain', isSelected: false },
      { id: 3, label: 'Redness', isSelected: true },
      { id: 4, label: 'Discharge', isSelected: false },
      { id: 5, label: 'Vision changes', isSelected: false },
      { id: 6, label: 'Other', isSelected: false },
    ],
  },
  {
    id: 4,
    title: 'Cardiovascular',
    options: [
      { id: 1, label: 'No concerns', isSelected: false },
      { id: 2, label: 'Chest Pain', isSelected: true },
      { id: 3, label: 'Shortness of breath', isSelected: false },
      { id: 4, label: 'Palpitations', isSelected: false },
      { id: 5, label: 'Other', isSelected: false },
    ],
  },
  {
    id: 5,
    title: 'Respiratory',
    options: [
      { id: 1, label: 'No concerns', isSelected: false },
      { id: 2, label: 'Cough', isSelected: true },
      { id: 3, label: 'Wheezing', isSelected: false },
      { id: 4, label: 'Dyspnea', isSelected: false },
      { id: 5, label: 'Other', isSelected: false },
    ],
  },
  {
    id: 6,
    title: 'Gastrointestinal',
    options: [
      { id: 1, label: 'No concerns', isSelected: false },
      { id: 2, label: 'Nausea/Vomiting', isSelected: true },
      { id: 3, label: 'Diarrhea', isSelected: false },
      { id: 4, label: 'Constipation', isSelected: false },
      { id: 5, label: 'Other', isSelected: false },
    ],
  },
  {
    id: 7,
    title: 'Genitourinary',
    options: [
      { id: 1, label: 'No concerns', isSelected: false },
      { id: 2, label: 'Dysmenorrhea', isSelected: true },
      { id: 3, label: 'Urinary frequency', isSelected: false },
      { id: 4, label: 'Urinary incontinence', isSelected: false },
      { id: 5, label: 'Other', isSelected: false },
    ],
  },
  {
    id: 8,
    title: 'Skin',
    options: [
      { id: 1, label: 'No concerns', isSelected: false },
      { id: 2, label: 'Skin lesions/rash', isSelected: true },
      { id: 3, label: 'Hair changes', isSelected: false },
      { id: 4, label: 'Breast changes', isSelected: false },
      { id: 5, label: 'Nipple discharge', isSelected: false },
      { id: 6, label: 'Other', isSelected: false },
    ],
  },
  {
    id: 9,
    title: 'Musculoskeletal',
    options: [
      { id: 1, label: 'No concerns', isSelected: false },
      { id: 2, label: 'Myalgias', isSelected: true },
      { id: 3, label: 'Joint/muscle stiffness', isSelected: false },
      { id: 4, label: 'Breast changes', isSelected: false },
      { id: 5, label: 'Other', isSelected: false },
    ],
  },
  {
    id: 10,
    title: 'Neuro',
    options: [
      { id: 1, label: 'No concerns', isSelected: false },
      { id: 2, label: 'Weakness', isSelected: true },
      { id: 3, label: 'Paresthesia', isSelected: false },
      { id: 4, label: 'Dizziness', isSelected: false },
      { id: 5, label: 'Headache', isSelected: false },
      { id: 6, label: 'Recent falls', isSelected: false },
      { id: 7, label: 'Other', isSelected: false },
    ],
  },
]

const ReviewOfSystemsSection = () => {
  const [systems, setSystems] = useState<ReviewSystem[]>(reviewSystems)

  const toggleOptionSelection = (optionId: number, systemTitle: string) => {
    setSystems((prevSystems) =>
      prevSystems.map((system) =>
        system.title === systemTitle
          ? {
              ...system,
              options: system.options.map((option) =>
                option.id === optionId
                  ? { ...option, isSelected: !option.isSelected }
                  : option,
              ),
            }
          : system,
      ),
    )
  }

  return (
    <>
      {systems.map((system) => (
        <Flex
          direction="column"
          className="max-w-[540px] gap-[10px]"
          key={system.id}
        >
          <Text className="text-[18px] font-[600] leading-6 text-[#151B4A]">
            {system.title}
          </Text>
          <Flex className="flex-wrap gap-[10px]">
            {system.options.map((option) => (
              <Box
                className={`cursor-pointer rounded-2 border ${
                  option.isSelected
                    ? 'text-white border-[#194595] bg-[#194595]'
                    : 'border-[#B9BBC6] bg-[#F7F9FC]'
                } px-[10px]  py-[6px]`}
                key={option.id}
                onClick={() => toggleOptionSelection(option.id, system.title)}
              >
                <Text
                  className="whitespace-nowrap text-[14px] capitalize"
                  weight="light"
                >
                  {option.label}
                </Text>
              </Box>
            ))}
          </Flex>
        </Flex>
      ))}
    </>
  )
}

export default ReviewOfSystemsSection
