'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'

interface NotificationTabCountProps {
  count: string
}
const NotificationTabCount = ({ count }: NotificationTabCountProps) => {
  return (
    <Flex
      align="center"
      justify="center"
      className="min-w-5 min-h-5 text-white rounded-full bg-red-11"
    >
      <Text weight="medium" className='text-[10px]'>
        {count}
      </Text>
    </Flex>
  )
}

export { NotificationTabCount }
