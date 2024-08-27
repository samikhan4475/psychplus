'use client'

import React from 'react'
import { Box, Flex, Grid, RadioGroup, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormSelect, FormTextInput } from '@psychplus/form'
import AddressComponent from './address-field'

const LocationInfo = () => {
  const form = useFormContext()
  const dummyOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'Yes', label: 'Yes' },
  ]
  return (
    <>
      <Box className="rounded-tl-1 rounded-tr-1 bg-[#EEF2F6] px-[7px] py-1">
        <Text
          weight={'bold'}
          className="text-[14px] leading-[16px] text-[#000] "
        >
          Location Info
        </Text>
      </Box>
      <Grid columns={'6'} gap={'3'} className="px-2 pb-5 pt-2">
        <Flex gap={'3'} className="col-span-2 ">
          <RadioGroup.Root
            color="indigo"
            highContrast
            defaultValue={form.watch('locationType')}
            onValueChange={(value) => {
              form.setValue('locationType', value)
            }}
          >
            <Flex direction="column" gap="3" pr={'2'}>
              <Text
                as="label"
                size="2"
                weight="bold"
                className="text-[#1C2024]"
              >
                Location Type
              </Text>
              <Flex className="gap-[18px]">
                <Flex gap="1" align="center">
                  <RadioGroup.Item value="Clinic" />
                  <Text
                    as="label"
                    size="2"
                    weight="bold"
                    className="text-[#1C2024]"
                  >
                    Clinic
                  </Text>
                </Flex>
                <Flex gap="1" align="center">
                  <RadioGroup.Item value="Facility" />
                  <Text
                    as="label"
                    size="2"
                    weight="bold"
                    className="text-[#1C2024]"
                  >
                    Facility
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </RadioGroup.Root>
          <Box className="flex-1">
            <FormTextInput
              label="Name"
              size="2"
              placeholder="Enter Name"
              required
              {...form.register('name')}
            />
          </Box>
        </Flex>
        <FormTextInput
          label="NPI"
          size="2"
          placeholder="Enter Npi"
          required
          {...form.register('npi')}
        />
        <FormTextInput
          label="Taxonomy"
          size="2"
          placeholder="Enter Taxonomy"
          {...form.register('taxonomy')}
        />
        <FormTextInput
          label="Phone"
          size="2"
          placeholder="Enter Phone"
          {...form.register('phone')}
        />
        <FormTextInput
          label="Fax"
          size="2"
          placeholder="Enter Fax"
          {...form.register('fax')}
        />
        <Flex gap={'3'} className="col-span-2">
          <Box className="w-full max-w-[137.13px]">
            <FormSelect
              label="Status"
              size="2"
              placeholder="Select"
              options={dummyOptions}
              required
              {...form.register('status')}
            />
          </Box>
          <Box className="w-full">
            <FormSelect
              label="Test Location"
              size="2"
              placeholder="Select"
              options={dummyOptions}
              required
              {...form.register('testLocation')}
            />
          </Box>
        </Flex>
        <FormTextInput
          label="ID"
          size="2"
          placeholder="Enter Id"
          required
          {...form.register('id')}
        />
      </Grid>
      <Flex direction={'column'}>
        <Box className="bg-[#EEF2F6] px-2 py-1">
          <Text
            weight={'bold'}
            className="text-[14px] leading-[16px] text-[#000] "
          >
            Address
          </Text>
        </Box>
        <AddressComponent title="Primary Address" />
      </Flex>
    </>
  )
}

export { LocationInfo }
