import { AddIcon } from '@/components/icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import React from 'react'

const LocationHeader = () => {
  return (
    <Flex align="center" justify="between" className="shadow-light-gray-08 h-8 bg-white px-2">
      <Text size="3" weight="bold">Location</Text>
      <Button size="1" type="button" className="bg-pp-black-2 rounded-1 font-medium">
        <Flex gap="2">
          <AddIcon />
          Add Location
        </Flex>
      </Button>
    </Flex>
  )
}

export { LocationHeader }