'use client'

import { PropsWithChildren, useState } from 'react'
import { Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { NewPatient } from '@/types'
import { AddVisitForm } from './components'
import { SlotDetails } from './types'

interface AddVisitProps {
  patient?: NewPatient
  showAddUser?: boolean
  onAdd?: () => void
  dateTime?: string
  timezone?: string
  isTimed?: boolean
  slotDetails?: SlotDetails
}

const AddVisit = ({
  children,
  slotDetails,
  onAdd,
  dateTime,
  timezone,
  isTimed,
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

        <AddVisitForm
          dateTime={dateTime}
          onAdd={onAdd}
          timezone={timezone}
          slotDetails={slotDetails}
          isTimed={isTimed}
          onClose={() => setIsOpen(false)}
          patient={patient}
          showAddUser={showAddUser}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddVisit }
