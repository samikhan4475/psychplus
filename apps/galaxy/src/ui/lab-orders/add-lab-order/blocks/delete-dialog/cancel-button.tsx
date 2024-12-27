'use client'

import { Button, Dialog } from '@radix-ui/themes'

const CancelButton = () => {
  return (
    <Dialog.Close>
      <Button
        variant="outline"
        color="gray"
        size="2"
        className="text-black text-1"
      >
        Cancel
      </Button>
    </Dialog.Close>
  )
}

export { CancelButton }
