import React, { useState } from 'react'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import ReviewOfSystemsSection from './blocks/review-of-systems-section'

const ReviewOfSystems: React.FC = () => {
  return (
    <Box className="bg-white rounded-2 border border-[#D9E2FC] p-6 pb-8">
      <Flex align="center" className="mb-4 flex-col gap-[19px] sm:flex-row">
        <Text className="text-black text-[32px] font-[600]  leading-8">
          Review of Systems
        </Text>
        <Button
          color="blue"
          variant="outline"
          className="bg-white h-[28px] content-center rounded-[100px] border border-[#194595] px-3 text-[12px] font-[600] text-[#194595] "
        >
          No Concerns
        </Button>
      </Flex>
      <Box className="gap:4 grid grid-cols-1 md:grid-cols-2 md:gap-6">
        <ReviewOfSystemsSection />
      </Box>
    </Box>
  )
}
export { ReviewOfSystems }
