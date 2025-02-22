'use client'

import { Button, Dialog } from '@radix-ui/themes'

const SubmitButton = ({
  onClick,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}) => {
  return (
    <Dialog.Close>
      <Button size="2" highContrast type="button" onClick={onClick}>
        Confirm
      </Button>
    </Dialog.Close>
  )
}

export { SubmitButton }
