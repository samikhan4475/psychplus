'use client'

import { getLocalTimeZone, isToday } from '@internationalized/date'
import { AppointmentType } from '@psychplus-v2/constants'
import {
  getAppointmentTypeLabel,
  getCalendarDate,
  getClinicAddressLabel,
  getDayOfWeekLabel,
  getMonthLabel,
  getProviderTypeLabel,
  getTimeLabel,
  getUserFullName,
} from '@psychplus-v2/utils'
import { Flex, Text } from '@radix-ui/themes'
import { ProviderAvatar } from '@/components-v2'
import { BookedAppointmentProps } from '@/features/appointments/book/types'

const AppointmentDetails = ({ bookedSlot }: BookedAppointmentProps) => {
  const { specialist, clinic, slot, appointmentType, providerType } = bookedSlot

  const slotDate = getCalendarDate(slot.startDate)
  const isSlotToday = isToday(slotDate, getLocalTimeZone())

  return (
    <Flex gap="3" align="center">
      <ProviderAvatar provider={specialist} size="8" />
      <Flex direction="column" gap="2">
        <Text trim="end" weight="bold" className="text-[22px] text-[#151B4A]">
          {getUserFullName(specialist.legalName)}
          {specialist.legalName.honors && `, ${specialist.legalName.honors}`}
        </Text>

        <Flex
          className="text-[18px] text-[#151B4A]"
          direction="row"
          gap="2"
          align="center"
        >
          <Flex direction="row" gap="1">
            {isSlotToday ? (
              <Text>Today</Text>
            ) : (
              <>
                <Text>{getDayOfWeekLabel(slotDate).slice(0, 3)},</Text>
                <Text>{getMonthLabel(slotDate).slice(0, 3)}</Text>
                <Text>{slotDate.day}</Text>
              </>
            )}
            <Text>-</Text>
            <Text>{getTimeLabel(slot.startDate)}</Text>
          </Flex>
        </Flex>
        <Flex gap="5">
          <Text weight="medium" className="text-[13px] text-accent-11">
            {getProviderTypeLabel(providerType).toLocaleUpperCase()}
          </Text>
          <Text weight="medium" className="text-[13px] text-accent-11">
            {getAppointmentTypeLabel(appointmentType).toLocaleUpperCase()}
          </Text>
        </Flex>

        {appointmentType === AppointmentType.InPerson && (
          <Text className="text-[14px] text-[#60646C]" weight="bold">
            {getClinicAddressLabel(clinic.contact.addresses)}
          </Text>
        )}
      </Flex>
    </Flex>
  )
}

export { AppointmentDetails }
