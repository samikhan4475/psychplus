'use client'

import React from 'react'
import { Box, Grid, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormSelect, FormTextInput } from '@psychplus/form'

const ServiceInfo = () => {
  const form = useFormContext()
  return (
    <>
      <Box className="bg-[#EEF2F6] px-[7px] py-1">
        <Text
          weight={'bold'}
          className="text-[14px] leading-[16px] text-[#000] "
        >
          Service Info
        </Text>
      </Box>
      <Grid
        columns={'6'}
        gap={'3'}
        px={'2'}
        className="bg-[#fff] pb-[10px] pt-2"
      >
        <FormSelect
          label="Location ID"
          size={'2'}
          options={dummyOptions}
          placeholder="Select"
          required
          {...form.register('locationID')}
        />
        <FormTextInput
          label="Location Type"
          size={'2'}
          disabled
          {...form.register('locationType')}
        />
        <FormTextInput
          label="State"
          size={'2'}
          disabled
          {...form.register('state1')}
        />
        <FormTextInput
          label="Service"
          size={'2'}
          disabled
          {...form.register('service')}
        />
        <FormSelect
          label="Place of Service (POS)"
          size={'2'}
          placeholder="Select"
          options={dummyOptions}
          {...form.register('pos')}
        />
        <FormSelect
          label="Provider Type"
          size={'2'}
          placeholder="Select"
          options={dummyOptions}
          {...form.register('providerType')}
        />
      </Grid>
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
export { ServiceInfo }
