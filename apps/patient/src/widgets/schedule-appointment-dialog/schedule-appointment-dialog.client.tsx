'use client'

import { useEffect } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Flex } from '@radix-ui/themes'
import { Dialog } from '@psychplus/ui/dialog'
import { usePubsub } from '@psychplus/utils/event'
import { clickTrack } from '@psychplus/utils/tracking'
import { SCHEDULE_APPOINTMENT_DIALOG } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'
import { useDialog, usePublishLoaded } from '@psychplus/widgets/hooks'
import { NewPatient } from './forms'

interface ScheduleAppointmentDialogClientProps {
  mapKey: string
  patientAppUrl: string
}

const ScheduleAppointmentDialogClient = ({
  mapKey,
  patientAppUrl,
}: ScheduleAppointmentDialogClientProps) => {
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
      <Dialog.Content className="text-pp-blue-8 relative max-w-[720px] rounded-6 px-[32px] py-[32px] font-bold sm:p-[32px] lg:w-[688px]">
        <Flex className="w-full items-center justify-between">
          <Dialog.Title className="mb-0 flex-1 text-left text-4 lg:text-7">
            Search for a NEW patient appointment
          </Dialog.Title>

          <Dialog.Close className="align-center h-[24px] w-[24px] cursor-pointer justify-center">
            <Cross2Icon />
          </Dialog.Close>
        </Flex>

        {open && (
          <NewPatient
            onclose={onClose}
            mapKey={mapKey}
            patientAppUrl={patientAppUrl}
          />
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ScheduleAppointmentDialogClient }
