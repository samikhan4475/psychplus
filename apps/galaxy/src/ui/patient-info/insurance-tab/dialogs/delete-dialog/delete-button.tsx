'use client'

import { Button, Dialog } from '@radix-ui/themes'

const DeleteButton = () => {
  return (
    <Dialog.Close>
      <Button size="2" color="red">
        Delete
      </Button>
    </Dialog.Close>
  )
}

export { DeleteButton }
