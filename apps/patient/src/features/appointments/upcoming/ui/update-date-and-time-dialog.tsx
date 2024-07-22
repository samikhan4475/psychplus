'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getLocalTimeZone, today } from '@internationalized/date'
import { Appointment } from '@psychplus-v2/types'
import { getCalendarDateLabel } from '@psychplus-v2/utils'
import { Box, Button, Dialog, Flex, Tooltip } from '@radix-ui/themes'
import { EditIcon, FormError } from '@/components-v2'
import { useToast } from '@/providers'
import { useStore } from '../../search/store'
import { AppointmentSlot } from '../../search/types'
import { DaysHeader } from '../../search/ui/search-appointments-view/days-header'
import { rescheduleAppointment } from '../actions'
import { AvailabilityList } from './availability-list'

interface SearchAppointmentsViewProps {
  appointment: Appointment
}

const UpdateDateAndTimeDialog = ({
  appointment,
}: SearchAppointmentsViewProps) => {
  const [isUpdateDateAndTimeDialog, setIsUpdateDateAndTimeDialog] =
    useState(false)

  const [selectedSlot, setSelectedSlot] = useState<AppointmentSlot>()
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(false)

  const { toast } = useToast()
  const router = useRouter()

  const { setStartingDate } = useStore((state) => ({
    setStartingDate: state.setStartingDate,
  }))

  const onSave = async () => {
    setLoading(true)
    if (selectedSlot) {
      const result = await rescheduleAppointment({
        appointmentId: appointment.id,
        specialistStaffId: appointment.specialist.id,
        specialistTypeCode: appointment.specialistTypeCode,
        type: appointment.type,
        startDate: selectedSlot?.startDate,
        duration: selectedSlot?.duration,
        locationId: appointment.clinic.id,
        serviceId: selectedSlot?.servicesOffered[0],
      })

      if (result.state === 'error') {
        setError(result.error)
      } else {
        setIsUpdateDateAndTimeDialog(false)
        toast({
          type: 'error',
          title: 'Appointment rescheduled successfully',
        })
        setStartingDate(getCalendarDateLabel(today(getLocalTimeZone())))
      }
    }
    router.refresh()
    setLoading(false)
  }

  return (
    <Dialog.Root
      open={isUpdateDateAndTimeDialog}
      onOpenChange={(open) => {
        setIsUpdateDateAndTimeDialog(open)
        setStartingDate(getCalendarDateLabel(today(getLocalTimeZone())))
      }}
    >
      <Tooltip
        content="Reschedule this appointment"
        delayDuration={300}
        className="max-w-[200px]"
      >
        <Dialog.Trigger>
          <Button variant="ghost" className="bg-[white]">
            <EditIcon />
          </Button>
        </Dialog.Trigger>
      </Tooltip>
      <Dialog.Content className="relative max-w-[800px]">
        <FormError message={error} />
        <Box className="border-b border-b-gray-5 pb-3">
          <DaysHeader />
        </Box>
        <AvailabilityList
          appointment={appointment}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
        />
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button
              variant="outline"
              color="gray"
              highContrast
              size="3"
              className="px-5"
            >
              Close
            </Button>
          </Dialog.Close>
          <Button
            highContrast
            size="3"
            onClick={onSave}
            disabled={loading}
            className={`px-5 ${loading && 'bg-gray-3'}`}
          >
            Save
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { UpdateDateAndTimeDialog }
