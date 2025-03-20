'use client'

import { Button, Dialog } from '@radix-ui/themes'

const DeleteButton = ({
  onClick,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}) => {
  return (
    <Dialog.Close>
      <Button size="2" color="red" type="button" onClick={onClick}>
        Delete
      </Button>
    </Dialog.Close>
  )
}

export { DeleteButton }
