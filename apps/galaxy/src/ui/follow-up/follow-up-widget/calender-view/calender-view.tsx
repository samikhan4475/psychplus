'use client'

import { useState } from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import {
  DateStepper as SchedulerDateStepper,
  SchedulerView,
} from '@/ui/schedule/scheduler-view'

const CloseDialogIcon = () => (
  <Dialog.Close className="absolute right-3 top-3 cursor-pointer">
    <Flex
      align="center"
      justify="center"
      className="rounded-full h-[35px] w-[35px] text-gray-11 transition-colors hover:bg-gray-3"
    >
      <Cross1Icon width={20} height={20} strokeWidth={1.5} />
    </Flex>
  </Dialog.Close>
)

const CalenderView = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
      }}
    >
      <Dialog.Trigger>
        <Button
          color="gray"
          className="text-black"
          size="1"
          variant="outline"
          type="button"
        >
          <Plus width={16} height={16} />
          Calender
        </Button>
      </Dialog.Trigger>

      <Dialog.Content className="relative max-w-[1100px]">
        <CloseDialogIcon />

        <Dialog.Title className="font-sans -tracking-[0.25px]">
          <Flex>
            Calender View
            <SchedulerDateStepper noOfDays={6} />
          </Flex>
        </Dialog.Title>

        <SchedulerView showFollowUpFilter={true} noOfDays={6} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { CalenderView }
