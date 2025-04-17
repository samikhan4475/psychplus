'use client'

import { useState } from 'react'
import { Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { AddRoleButton } from './add-role-button'
import { RoleForm } from './copy-permissions-form'

const RoleDialog = () => {
  const [open, setOpen] = useState(false)

  const onOpenChange = (open: boolean) => {
    setOpen(open)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AddRoleButton />
      <Dialog.Content className="relative max-w-[800px]">
        <CloseDialogTrigger />

        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Copy Permissions
        </Dialog.Title>

        <RoleForm onCloseModal={onOpenChange} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { RoleDialog }
