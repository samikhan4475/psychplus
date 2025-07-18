'use client'

import { EditIcon, FormError } from '@/components-v2'
import { useProfileStore } from '@/features/account/profile/store'
import { useToast } from '@/providers'
import { Appointment } from '@psychplus-v2/types'
import {
  getNewProviderTypeLabel,
  getProviderTypeLabel,
} from '@psychplus-v2/utils'
import { Popover } from '@psychplus/ui/popover'
import { Box, Button, Flex, Tooltip } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useStore } from '../../search/store'
import { AppointmentSlot } from '../../search/types'
import { DaysHeader } from '../../search/ui/search-appointments-view/days-header'
import { getStartOfWeek } from '../../search/utils'
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
  const { profile } = useProfileStore((state) => ({
    profile: state.profile,
  }))

  const onSave = async () => {
    setLoading(true)
    setError('')
    if (selectedSlot) {
      const result = await rescheduleAppointment({
        appointmentId: appointment.id,
        specialistStaffId: appointment.specialist.id,
        specialistTypeCode: appointment.specialistTypeCode,
        providerType: getNewProviderTypeLabel(
          getProviderTypeLabel(appointment.specialistTypeCode),
        ),
        type: appointment.type,
        startDate: selectedSlot?.startDateUtc ?? selectedSlot?.startDate,
        duration: selectedSlot?.duration,
        locationId: appointment.clinic.id,
        serviceId: selectedSlot?.servicesOffered[0],
        isSelfPay: appointment.isSelfPay,
        stateCode: appointment.clinic.contact.addresses?.[0]?.state,
        appointmentSource: 'PatientPortal',
        patientResidingStateCode:
          profile?.contactDetails?.addresses?.filter(
            (address) => address.type === 'Home',
          )?.[0]?.state || '',
        paymentResponsibilityTypeCode: appointment.paymentResponsibilityTypeCode,
      })

      if (result.state === 'error') {
        setError(result.error)
      } else {
        setIsUpdateDateAndTimeDialog(false)
        toast({
          type: 'success',
          title: 'Date And Time Changed',
        })
        setStartingDate(getStartOfWeek(new Date()))
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
        setStartingDate(getStartOfWeek(new Date()))
      }}
    >
      <Tooltip
        content="Change Date and Time"
        delayDuration={300}
        className="max-w-[200px]"
      >
        <Popover.Trigger>
          <Button variant="ghost" className="bg-[white] mt-1">
            <EditIcon />
          </Button>
        </Popover.Trigger>
      </Tooltip>
      <Popover.Content align="center" className="w-[300px] md:w-[600px] lg:w-[800px]">
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
