'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getLocalTimeZone, today } from '@internationalized/date'
import { Appointment } from '@psychplus-v2/types'
import { getCalendarDateLabel } from '@psychplus-v2/utils'
import { Box, Button, Flex, Tooltip } from '@radix-ui/themes'
import { Popover } from '@psychplus/ui/popover'
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
    setError('')
    if (selectedSlot) {
      const result = await rescheduleAppointment({
        appointmentId: appointment.id,
        specialistStaffId: appointment.specialist.id,
        specialistTypeCode: appointment.specialistTypeCode,
        type: appointment.type,
        startDate: selectedSlot?.startDateUtc ?? selectedSlot?.startDate,
        duration: selectedSlot?.duration,
        locationId: appointment.clinic.id,
        serviceId: selectedSlot?.servicesOffered[0],
        isSelfPay: appointment.isSelfPay,
      })

      if (result.state === 'error') {
        setError(result.error)
      } else {
        setIsUpdateDateAndTimeDialog(false)
        toast({
          type: 'success',
          title: 'Date And Time Changed',
        })
        setStartingDate(getCalendarDateLabel(today(getLocalTimeZone())))
        router.refresh()
      }
    }
    setLoading(false)
  }

  return (
    <Popover.Root
      open={isUpdateDateAndTimeDialog}
      onOpenChange={(open) => {
        setIsUpdateDateAndTimeDialog(open)
        setError('')
        setStartingDate(getCalendarDateLabel(today(getLocalTimeZone())))
      }}
    >
      <Tooltip
        content="Change Date and Time"
        delayDuration={300}
        className="max-w-[200px]"
      >
        <Popover.Trigger>
          <Button variant="ghost" className="bg-[white]">
            <EditIcon />
          </Button>
        </Popover.Trigger>
      </Tooltip>
      <Popover.Content align="center" className="w-[800px]">
        <FormError message={error} />
        <Box className="border-b border-b-gray-5 pb-3">
          <DaysHeader />
        </Box>
        <Box className="max-h-[250px] overflow-x-auto">
          <AvailabilityList
            appointment={appointment}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
          />
        </Box>
        <Flex gap="3" mt="4" justify="end">
          <Popover.Close>
            <Button
              variant="outline"
              color="gray"
              highContrast
              size="3"
              radius="full"
              className="px-5"
            >
              Close
            </Button>
          </Popover.Close>
          <Button
            highContrast
            size="3"
            onClick={onSave}
            radius="full"
            disabled={loading}
            className={`px-5 ${loading && 'bg-gray-3'}`}
          >
            Save
          </Button>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  )
}

export { UpdateDateAndTimeDialog }
