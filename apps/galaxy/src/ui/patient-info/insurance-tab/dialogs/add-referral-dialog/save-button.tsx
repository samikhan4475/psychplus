'use client'

import { Button, Dialog, Flex } from '@radix-ui/themes'

const SaveButton = () => {
  return (
    <Dialog.Close>
      <Flex justify="end" className="mt-6">
        <Button type="submit" size="1" highContrast>
          Save
        </Button>
      </Flex>
    </Dialog.Close>
  )
}

export { SaveButton }
