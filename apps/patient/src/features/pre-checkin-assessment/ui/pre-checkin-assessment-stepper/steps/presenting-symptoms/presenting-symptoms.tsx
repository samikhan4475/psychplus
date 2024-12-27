import React from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import Complaints from './blocks/Complaints'
import Symptoms from './blocks/Symptoms'

const PresentingSymptoms = () => {
  return (
    <Box>
      <Flex
        className="bg-white rounded-[8px] border border-[#d9e2fc] px-5 pb-9 pt-7"
        gap="1"
        direction="column"
      >
        <Text className="mb-3 text-[18px] font-medium text-[#1C2024] lg:text-[24px]">
          Presenting Symptoms (HPI)
        </Text>
        <Flex className="mt-2 w-full flex-col gap-1 lg:flex-row lg:items-center lg:justify-start lg:gap-3">
          <Complaints />
        </Flex>
        <Flex className="mt-3 w-full" direction={'column'} gap={'5'}>
          <Symptoms />
        </Flex>
      </Flex>
    </Box>
  )
}

export { PresentingSymptoms }
