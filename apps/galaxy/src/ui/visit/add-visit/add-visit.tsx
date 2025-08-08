'use client'

import { PropsWithChildren, useState } from 'react'
import { Dialog, Flex, Switch } from '@radix-ui/themes'
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
  const [isCustomAppointment, setIsCustomAppointment] = useState(false)
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        setIsCustomAppointment(false)
        setIsOpen(open)
      }}
    >
      <Dialog.Trigger>{children}</Dialog.Trigger>

      <Dialog.Content className="relative max-w-[700px]">
        <CloseDialogTrigger />
        <Flex className="absolute right-14 top-5 gap-1.5 text-[14px]">
          <Switch
            size="1"
            onCheckedChange={() => setIsCustomAppointment(!isCustomAppointment)}
            checked={isCustomAppointment}
            color="green"
          />
          Custom Visit
        </Flex>
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Add {isCustomAppointment && 'Custom'} Visit
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
          isCustomAppointment={isCustomAppointment}
          consultationDate={consultationDate}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddVisit }
