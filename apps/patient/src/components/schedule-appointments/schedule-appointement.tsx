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
        <Button
          className="min-h-[60px] w-[286px] min-w-[286px] bg-[#F2DB77] font-bold text-[#151B4A]"
          radius="full"
          size="3"
        >
          Schedule Appointment
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[720px] rounded-6 px-5 py-12 font-bold text-[#151B4A] sm:p-12">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>
        <Dialog.Title className="text-7 max-sm:text-6 max-xs:text-5 sm:text-8 md:text-8 lg:text-8 xl:text-8">
          Schedule an appointment
        </Dialog.Title>
        <ScheduleTabs onClose={onClose} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ScheduleAppointment }
