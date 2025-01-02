import React, { useState } from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'

const YesNoBlock = () => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null)

  const handleSelect = (item: string) => {
    setSelectedValue((prev) => (prev === item ? null : item))
  }

  return (
    <Flex gap="3" mt="1">
      {['Yes', 'No'].map((item) => {
        const isSelected = selectedValue === item
        return (
          <Box
            className={`rounded-2 border ${
              isSelected
                ? 'text-white border-[#194595] bg-[#194595]'
                : 'border-[#B9BBC6] bg-[#F7F9FC]'
            } cursor-pointer px-[10px] py-[6px]`}
            key={item}
            onClick={() => handleSelect(item)}
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
  )
}

export default YesNoBlock
