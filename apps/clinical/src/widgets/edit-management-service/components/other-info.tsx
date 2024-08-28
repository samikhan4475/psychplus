'use client'

import React from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormSelect } from '@psychplus/form'
import { VisitTypeDiagnosisTable } from './visit-type-diagnosis-table'

const OtherInfo = () => {
  const { register } = useFormContext()
  return (
    <>
      <Box className="rounded-tl-1 rounded-tr-1 bg-[#EEF2F6] px-2 py-1">
        <Text
          weight={'bold'}
          className="text-[14px] leading-[16px] text-[#000]"
        >
          Other Info
        </Text>
      </Box>
      <Flex
        direction={'column'}
        width={'100%'}
        px={'2'}
        className="bg-[#fff] py-[10px]"
        gap={'2'}
      >
        <Flex justify={'start'} gap={'3'} direction={'row'}>
          <Box className="w-full max-w-[196.67px]">
            <FormSelect
              label="Max Booking Frequency"
              options={dummyOptions}
              placeholder="Select"
              required
              size={'2'}
              {...register('maxBookingFee')}
            />
          </Box>
          <Box className="w-full max-w-[166.33px]">
            <FormSelect
              label="Cosigner Type"
              options={dummyOptions}
              placeholder="Select"
              required
              size={'2'}
              {...register('cosignerType')}
            />
          </Box>
          <Box className="w-full max-w-[192px]">
            <FormSelect
              label="Cosigner"
              options={dummyOptions}
              placeholder="Select"
              required
              size={'2'}
              {...register('cosigner')}
            />
          </Box>
        </Flex>
        <VisitTypeDiagnosisTable />
      </Flex>
    </>
  )
}
const dummyOptions = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: 'location', label: 'Location' },
  {
    value: '125637MNV',
    label: '125637MNV',
  },
]
export { OtherInfo }
