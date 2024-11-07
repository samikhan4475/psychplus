'use client'

import { Button, Flex } from '@radix-ui/themes'

const SaveChargesButton = () => {
  return (
    <Flex justify="end" mt="3">
      <Button size="2" highContrast>
        Save Changes
      </Button>
    </Flex>
  )
}

export { SaveChargesButton }
