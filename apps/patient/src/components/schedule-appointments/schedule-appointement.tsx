'use client'

import { useState } from 'react'
import { Dialog } from '@psychplus/ui/dialog'
import { Button } from '@psychplus/ui/button'
import { Cross2Icon } from '@radix-ui/react-icons'
import { ScheduleTabs } from './tabs'

const ScheduleAppointment = () => {
  
  const [open , setOpen] = useState(false);
  const onClose = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button className='min-w-[286px] w-[286px] min-h-[60px] rounded-[30px] bg-amber-6 text-blue-11 font-bold'>Schedule Appointment</Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[720px] h-[673px] font-bold">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>
        <Dialog.Title className="text-[32px] text-blue-12 font-bold mb-10">Schedule an appointment</Dialog.Title>
        <ScheduleTabs onclose={onClose}/>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ScheduleAppointment }