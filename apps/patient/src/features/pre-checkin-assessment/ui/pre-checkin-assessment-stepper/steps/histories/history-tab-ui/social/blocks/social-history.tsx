import React, { useState } from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'

const socials = [
  {
    id: 'relationshipStatus',
    title: 'Relationship Status',
    options: [
      {
        label: 'Single',
        value: 'single',
      },
      {
        label: 'Divorced/Separated',
        value: 'divorcedSeparated',
      },
      {
        label: 'Dating',
        value: 'dating',
      },
      {
        label: 'Married',
        value: 'married',
      },
    ],
  },
  {
    id: 'professionalEducation',
    title: 'Professional Education',
    options: [
      {
        label: 'In School',
        value: 'inSchool',
      },
      {
        label: 'HS/GED',
        value: 'hsGed',
      },
      {
        label: 'College',
        value: 'college',
      },
      {
        label: 'None',
        value: 'none',
      },
    ],
  },
  {
    id: 'employed',
    title: 'Employed',
    options: [
      {
        label: 'Yes',
        value: 'yes',
      },
      {
        label: 'No',
        value: 'no',
      },
    ],
  },
  {
    id: 'legalHistory',
    title: 'Legal History',
    options: [
      {
        label: 'Yes',
        value: 'yes',
      },
      {
        label: 'No',
        value: 'no',
      },
    ],
  },
  {
    id: 'living',
    title: 'Living',
    options: [
      {
        label: 'Alone',
        value: 'alone',
      },
      {
        label: 'With Family',
        value: 'withFamily',
      },
      {
        label: 'Homeless',
        value: 'homeless',
      },
    ],
  },
  {
    id: 'traumaHx',
    title: 'Trauma Hx',
    options: [
      {
        label: 'Physical',
        value: 'physical',
      },
      {
        label: 'Emotional',
        value: 'emotional',
      },
      {
        label: 'Sexual',
        value: 'sexual',
      },
    ],
  },
]

const SocialHistory = () => {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string | null>
  >(socials.reduce((acc, social) => ({ ...acc, [social.id]: null }), {}))

  const handleSelect = (socialId: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [socialId]: prev[socialId] === value ? null : value,
    }))
  }

  return (
    <>
      {socials.map((social) => (
        <Flex key={social.id} justify="center" align="start" direction="column">
          <Text weight="bold" className="pb-1.5">
            {social.title}:
          </Text>
          <Flex gap="3">
            {social.options.map((option) => {
              const isSelected = selectedOptions[social.id] === option.value
              return (
                <Box
                  className={`rounded-2 border ${
                    isSelected
                      ? 'text-white border-[#194595] bg-[#194595]'
                      : 'border-[#B9BBC6] bg-[#F7F9FC]'
                  } cursor-pointer px-[10px] py-[6px]`}
                  key={option.label}
                  onClick={() => handleSelect(social.id, option.value)}
                >
                  <Text
                    className="whitespace-nowrap text-[14px] capitalize"
                    weight="light"
                  >
                    {option.label}
                  </Text>
                </Box>
              )
            })}
          </Flex>
        </Flex>
      ))}
    </>
  )
}

export default SocialHistory
