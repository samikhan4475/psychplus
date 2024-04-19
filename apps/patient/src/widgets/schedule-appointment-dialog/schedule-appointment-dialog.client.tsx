'use client'

import { useEffect } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Dialog } from '@psychplus/ui/dialog'
import { usePubsub } from '@psychplus/utils/event'
import { clickTrack } from '@psychplus/utils/tracking'
import { SCHEDULE_APPOINTMENT_DIALOG } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'
import { useDialog, usePublishLoaded } from '@psychplus/widgets/hooks'
import { ScheduleTabs } from './tabs'

const ScheduleAppointmentDialogClient = () => {
  const { publish } = usePubsub()
  const { open } = useDialog(SCHEDULE_APPOINTMENT_DIALOG)
  usePublishLoaded(SCHEDULE_APPOINTMENT_DIALOG)

  const onClose = () => {
    publish(`${SCHEDULE_APPOINTMENT_DIALOG}:${EventType.Closed}`)
  }

  useEffect(() => {
    clickTrack({
      productArea: 'Patient',
      productPageKey: 'ScheduleAppointment',
      clickAction: 'Navigation',
      clickActionData: 'Schedule Appointment Dialog',
    })
  }, [])

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          publish(`${SCHEDULE_APPOINTMENT_DIALOG}:${EventType.Closed}`)
        }
      }}
    >
      <Dialog.Content className="relative max-w-[720px] rounded-6 px-5 py-12 font-bold text-[#151B4A] sm:p-12">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>
        <Dialog.Title className="text-center text-7 sm:text-left sm:text-8">
          Schedule an appointment
        </Dialog.Title>
        {open && <ScheduleTabs onClose={onClose} />}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ScheduleAppointmentDialogClient }
