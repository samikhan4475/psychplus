'use client'

import { Box, Flex, RadioGroup, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { AddressComponent } from '@/components/address-fields'
import { useUsStatesOptions } from '../hooks'

const ClaimAddress = () => {
  const usStates = useUsStatesOptions()
  const form = useFormContext()
  return (
    <Box className="bg-[#fff]">
      <Box className="rounded-tl-1 rounded-tr-1 bg-[#EEF2F6] px-2 py-1">
        <Text
          weight={'bold'}
          className="text-[14px] leading-[16px] text-[#000]"
        >
          Claim Address
        </Text>
      </Box>
      <Flex
        className="max-w-[630px] gap-y-[10px]  py-[10px]"
        direction={'column'}
        width={'100%'}
        px={'2'}
      >
        <Flex
          width={'100%'}
          direction={'row'}
          align={'center'}
          justify={'between'}
          gap={'3'}
        >
          <Text size={'3'} weight={'medium'}>
            Claim Address
          </Text>
          <Flex
            align="center"
            className="box-border justify-between gap-x-[25px] gap-y-1 rounded-[4px] bg-[#F0F4FF] px-3 py-1"
          >
            <Text weight="bold" className="text-[13px]">
              Is your claim address same as Primary?
            </Text>
            <RadioGroup.Root
              defaultValue={form.watch('claimAddressSameAsPrimary')}
              size="3"
              color="indigo"
              onValueChange={(val) =>
                form.setValue('claimAddressSameAsPrimary', val)
              }
              highContrast
            >
              <Flex gap="3">
                <Text as="label" size="2">
                  <Flex gap="1">
                    <RadioGroup.Item value="No" /> No
                  </Flex>
                </Text>
                <Text as="label" size="2">
                  <Flex gap="1">
                    <RadioGroup.Item value="Yes" /> Yes
                  </Flex>
                </Text>
              </Flex>
            </RadioGroup.Root>
          </Flex>
        </Flex>
        <AddressComponent usStates={usStates} />
      </Flex>
    </Box>
  )
}

export { ClaimAddress }
