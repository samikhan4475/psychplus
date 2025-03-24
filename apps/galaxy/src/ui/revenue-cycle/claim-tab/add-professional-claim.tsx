'use client'

import { useState } from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import { Button, Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { AddClaimForm } from '../professional-claim'

const AddProfessionalClaimDialog = () => {
  const [open, setOpen] = useState(false)

  const onOpenChange = (open: boolean) => {
    setOpen(open)
  }
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger>
        <Button size="1" highContrast>
          <PlusIcon /> Add New Claim
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[900px]">
        <CloseDialogTrigger />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Create New Claim
        </Dialog.Title>
        <AddClaimForm onCloseModal={onOpenChange} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddProfessionalClaimDialog }
