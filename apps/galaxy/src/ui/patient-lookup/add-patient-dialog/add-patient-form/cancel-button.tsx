'use client'

import { Button, Dialog } from '@radix-ui/themes'

const CancelButton = () => {
  return (
    <Dialog.Close>
      <Button
        variant="outline"
        color="gray"
        type="button"
        className="text-black disabled:text-gray-11"
      >
        Cancel
      </Button>
    </Dialog.Close>
  )
}

export { CancelButton }
