'use client'

import { PropsWithChildren, useState } from 'react'
import { Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { NewPatient } from '@/types'
import { AddVisitForm } from './components'
import { AppointmentData, SlotDetails } from './types'

interface AddVisitProps {
  patient?: NewPatient
  showAddUser?: boolean
  onAdd?: (responseData?: AppointmentData) => void
  dateTime?: string
  timezone?: string
  isTimed?: boolean
  slotDetails?: SlotDetails
  isFollowup?: boolean
  consultationDate?: string
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
  isFollowup = false,
  consultationDate,
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
          isFollowup={isFollowup}
          consultationDate={consultationDate}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddVisit }
