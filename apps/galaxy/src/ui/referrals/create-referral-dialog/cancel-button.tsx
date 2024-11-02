'use client'

import { Button, Dialog } from '@radix-ui/themes'

const CancelButton = () => {
  return (
    <Dialog.Close>
      <Button type="button" variant="outline" color="gray" size="2">
        Cancel
      </Button>
    </Dialog.Close>
  )
}

export { CancelButton }
