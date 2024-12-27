import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import PillBlock from '../../../shared-blocks/pill-block'

const complaints = [
  {
    name: 'Depression',
    isSelected: true,
  },
  {
    name: 'Anxiety',
    isSelected: true,
  },
  {
    name: 'ADHD',
    isSelected: false,
  },
  {
    name: 'Dementia',
    isSelected: false,
  },
  {
    name: 'OCD',
    isSelected: false,
  },
  {
    name: 'PTSD',
    isSelected: true,
  },
  {
    name: 'Bipolar',
    isSelected: false,
  },
  {
    name: 'Compulsion',
    isSelected: true,
  },
  {
    name: 'Schizophrenia',
    isSelected: true,
  },
]

const Complaints = () => {
  return (
    <>
      <Text className="text-[16px] font-medium capitalize text-[#151B4A] lg:text-[18px]">
        Chief Complaint
      </Text>
      <Flex gap="3" className="overflow-x-auto">
        {complaints.map((complaint) => (
          <PillBlock
            key={complaint.name}
            data={complaint}
            fontSize={'16px'}
            rounded={6}
            fontWeight="medium"
            bgColor="none"
          />
        ))}
      </Flex>
    </>
  )
}

export default Complaints
