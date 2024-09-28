'use client'

import { PropsWithChildren, useState } from 'react'
import { Box, Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { State } from '@/types'
import { EditVisitForm } from './components'
import { StaffComments } from './components/staff-comments'

const EditVisit = ({
  children,
  states,
}: PropsWithChildren<{ states: State[] }>) => {
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
          Edit Visit - Visit Details
        </Dialog.Title>

        <EditVisitForm states={states} />

        <Box className="my-2 h-px bg-gray-6" />

        <StaffComments />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { EditVisit }
