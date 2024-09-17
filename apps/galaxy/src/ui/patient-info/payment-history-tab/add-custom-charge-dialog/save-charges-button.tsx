'use client'

import { Button, Flex } from '@radix-ui/themes'

const SaveChargesButton = () => {
  return (
    <Flex justify="end" mt="5">
      <Button
        size="2"
        className="w-52 !rounded-3 text-2 font-medium"
        highContrast
      >
        Save Changes
      </Button>
    </Flex>
  )
}

export { SaveChargesButton }
