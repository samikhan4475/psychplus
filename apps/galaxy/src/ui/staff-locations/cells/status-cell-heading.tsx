import React from 'react'
import { Flex, Popover, Text } from '@radix-ui/themes'
import { X } from 'lucide-react'

const StatusCellHeading = () => {
  return (
    <Flex
      align="center"
      p="1"
      justify="between"
      className="bg-white -mt-[1px] border border-gray-5"
    >
      <Text className="text-1 font-[600] text-accent-12">Status History</Text>
      <Popover.Close>
        <X className="cursor-pointer" size="14" />
      </Popover.Close>
    </Flex>
  )
}

export { StatusCellHeading }
