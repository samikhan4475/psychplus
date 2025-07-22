import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { AvatarsIcon } from '@/components-v2'

const EmptyChatHeadState = () => {
  return (
    <Flex
      className="border-r-pp-gray-2 w-[300px] overflow-y-auto border-r px-4"
      direction={'column'}
      justify={'center'}
      align={'center'}
    >
      <AvatarsIcon />
      <Text className="text-center text-gray-11">
        You have not initiated any chat yet
      </Text>
    </Flex>
  )
}

export default EmptyChatHeadState
