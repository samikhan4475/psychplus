'use client'

import { ReactElement, useState } from 'react'
import { Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { AddVisitForm } from './components'

const AddVisit = ({ children }: { children: ReactElement }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
      }}
    >
      <Dialog.Trigger>{children}</Dialog.Trigger>

      <Dialog.Content className="relative max-w-[700px]">
        <CloseDialogTrigger />

        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Add Visit
        </Dialog.Title>

        <AddVisitForm />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddVisit }
