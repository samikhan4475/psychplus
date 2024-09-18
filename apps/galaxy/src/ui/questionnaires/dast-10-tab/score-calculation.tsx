import React from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'

const ScoreCalculation = () => {
  return (
    <Flex
      align="center"
      justify="between"
      className="h-9 border-y border-gray-3"
      px="2"
    >
      <Flex className="" gap="4">
        <Text weight="bold" size="2">
          Score Calculation
        </Text>

        <Flex gap="2" align="center">
          <Box className="h-[14.24px] w-[22px] rounded-1 border border-gray-6" />
          <Text className="text-black" size="1">
            Score of 1 for yes on questions 1,2,4,5,6,7,8,9,10
          </Text>
        </Flex>
        <Flex gap="2" align="center">
          <Box className="h-[14.24px] w-[22px] rounded-1 border border-gray-6" />
          <Text className="text-black" size="1">
            Score of 1 for no on questions 3
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export { ScoreCalculation }
