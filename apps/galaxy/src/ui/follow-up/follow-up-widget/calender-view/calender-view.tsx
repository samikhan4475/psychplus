'use client'

import { useMemo, useState } from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { useFormContext, useWatch } from 'react-hook-form'
import { NewPatient } from '@/types'
import {
  DateStepper as SchedulerDateStepper,
  SchedulerView,
} from '@/ui/schedule/scheduler-view'
import { SchemaType } from '../schema'
import { useStore } from '../store'
import { getOffsetStartDate } from '../utils'

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

const CalenderView = ({
  onVisitAdd,
  patient,
  appointmentDate,
}: {
  onVisitAdd: () => void
  patient: undefined | NewPatient
  appointmentDate: undefined | string
}) => {
  const form = useFormContext<SchemaType>()
  const isFollowupDenied = useStore((state) => state.isFollowupDenied)
  const [isOpen, setIsOpen] = useState(false)
  const next = useWatch({
    control: form.control,
    name: 'next',
  })
  const offsetStartDate = useMemo(() => {
    const offsetStartDate = getOffsetStartDate(
      next,
      appointmentDate ?? new Date().toISOString(),
    )
    return offsetStartDate
  }, [appointmentDate, next])

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
          className="text-black data-[disabled=true]:bg-pp-states-disabled data-[disabled=true]:text-pp-dark-grey"
          size="1"
          variant="outline"
          disabled={isFollowupDenied}
          type="button"
        >
          <Plus width={16} height={16} />
          Calendar
        </Button>
      </Dialog.Trigger>

      <Dialog.Content className="relative max-w-[1100px]">
        <CloseDialogIcon />

        <Dialog.Title className="font-sans -tracking-[0.25px]">
          <Flex>
            Calendar View
            <SchedulerDateStepper noOfDays={6} />
          </Flex>
        </Dialog.Title>

        <SchedulerView
          isFollowup={true}
          consultationDate={appointmentDate}
          noOfDays={6}
          patient={patient}
          onVisitAdd={onVisitAdd}
          offsetStartDate={offsetStartDate}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { CalenderView }
