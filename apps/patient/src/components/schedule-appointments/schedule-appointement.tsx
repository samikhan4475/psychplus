'use client'

import { useState } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Button } from '@psychplus/ui/button'
import { Dialog } from '@psychplus/ui/dialog'
import { ScheduleTabs } from './tabs'

const ScheduleAppointment = () => {
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button className="min-h-[60px] w-[286px] min-w-[286px] rounded-[30px] bg-amber-6 font-bold text-blue-11">
          Schedule Appointment
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative h-[673px] max-w-[720px] font-bold">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>
        <Dialog.Title className="mb-10 text-[32px] font-bold text-blue-12">
          Schedule an appointment
        </Dialog.Title>
        <ScheduleTabs onClose={onClose} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ScheduleAppointment }
