'use client'

import { Button, Flex } from '@radix-ui/themes'

const SaveButton = () => {
  return (
    <Flex justify="end" mt="3">
      <Button variant="solid" type="submit" size="2" highContrast>
        Save
      </Button>
    </Flex>
  )
}

export { SaveButton }
