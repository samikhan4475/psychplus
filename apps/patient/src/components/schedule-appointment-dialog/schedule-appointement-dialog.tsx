'use client'

import { useState } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Button } from '@psychplus/ui/button'
import { Dialog } from '@psychplus/ui/dialog'
import { ScheduleAppointmentDialogForm } from './schedule-appointment-form/schedule-appointment-form'

const ScheduleAppointmentDialog = ({ title }: { title: string }) => {
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button
          className="h-12 w-48 bg-accent-11 text-4 font-bold text-[white]"
          size="3"
        >
          {title}
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative rounded-6 p-8 font-bold text-[#151B4A]">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>
        <Dialog.Title className="text-7 max-sm:text-6 max-xs:text-5 sm:text-8 md:text-8 lg:text-8 xl:text-8">
          Schedule an appointment
        </Dialog.Title>
        <ScheduleAppointmentDialogForm onclose={onClose} title={title} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ScheduleAppointmentDialog }
