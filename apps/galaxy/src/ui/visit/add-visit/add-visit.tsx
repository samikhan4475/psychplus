'use client'

import { PropsWithChildren, useState } from 'react'
import { Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { NewPatient } from '@/types'
import { AddVisitForm } from './components'

interface AddVisitProps {
  patient?: NewPatient
  showAddUser?: boolean
}

const AddVisit = ({
  children,
  patient,
  showAddUser,
}: PropsWithChildren<AddVisitProps>) => {
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

        <AddVisitForm patient={patient} showAddUser={showAddUser} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddVisit }
