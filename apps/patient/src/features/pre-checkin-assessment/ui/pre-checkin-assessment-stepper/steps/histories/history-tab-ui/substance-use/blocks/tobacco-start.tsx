import React from 'react'
import { Box, Flex, Text, TextFieldInput } from '@radix-ui/themes'

const TobaccoStart = () => {
  return (
    <Flex gap="3">
      <Box>
        <Text className="pb-1.5 text-[14px]" weight="medium">
          Start Date
        </Text>
        <TextFieldInput
          type="date"
          data-testid="start-date"
          max="9999-12-31"
          className="mr-4 h-[34px] w-[150px] rounded-2 text-[14px]"
        />
      </Box>
      <Box>
        <Text className="pb-1.5 text-[14px]" weight="medium">
          End Date
        </Text>
        <TextFieldInput
          type="date"
          data-testid="end-date"
          max="9999-12-31"
          className="mr-4 h-[34px] w-[150px] rounded-2 text-[14px]"
        />
      </Box>
    </Flex>
  )
}

export default TobaccoStart
