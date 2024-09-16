'use client'

import { Button, Dialog, Flex } from '@radix-ui/themes'

const VerifyButton = () => {
  return (
    <Dialog.Close>
      <Flex>
        <Button type="submit" size="2" highContrast>
          Verify
        </Button>
      </Flex>
    </Dialog.Close>
  )
}

export { VerifyButton }
