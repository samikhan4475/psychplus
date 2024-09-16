'use client'

import { useState } from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { AddReferralDialog } from '../dialogs'

const AddAuthButton = () => {
  const [open, setOpen] = useState(false)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)
  return (
    <>
      <Button
        size="1"
        variant="outline"
        color="gray"
        className="text-black"
        type="button"
        onClick={onOpen}
      >
        <PlusIcon /> Auth/Ref
      </Button>
      <AddReferralDialog open={open} onClose={onClose} />
    </>
  )
}

export { AddAuthButton }
