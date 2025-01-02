import React, { useState } from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'

const TobaccoHistory = () => {
  const [selectedTobacco, setSelectedTobacco] = useState<string | null>(null)

  const handleSelectTobacco = (item: string) => {
    setSelectedTobacco((prev) => (prev === item ? null : item))
  }

  return (
    <>
      <Text weight="bold" className="pb-1.5">
        Tobacco:
      </Text>
      <Flex gap="3">
        {['yes', 'no', 'chew', 'smoke'].map((item) => {
          const isSelected = selectedTobacco === item
          return (
            <Box
              className={`rounded-2 border ${
                isSelected
                  ? 'text-white border-[#194595] bg-[#194595]'
                  : 'border-[#B9BBC6] bg-[#F7F9FC]'
              } cursor-pointer px-[10px] py-[6px]`}
              key={item}
              onClick={() => handleSelectTobacco(item)}
            >
              <Text
                className="whitespace-nowrap text-[14px] capitalize"
                weight="light"
              >
                {item}
              </Text>
            </Box>
          )
        })}
      </Flex>
    </>
  )
}

export default TobaccoHistory
