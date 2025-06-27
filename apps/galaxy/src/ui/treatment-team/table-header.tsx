'use client'

import { Flex, Text } from '@radix-ui/themes'

const TableHeader = ({ heading }: { heading: string }) => {
  return (
    <Flex className="bg-white w-[90%] items-center justify-between gap-3 pb-2 sm:w-[80%] md:w-[50%]">
      <Text size="4" weight="medium" className=" whitespace-nowrap">
        {heading}
      </Text>
    </Flex>
  )
}

export { TableHeader }
