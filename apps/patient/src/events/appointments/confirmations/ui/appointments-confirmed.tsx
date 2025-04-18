'use client'

import React, { useMemo } from 'react'
import { AppointmentType } from '@psychplus-v2/constants'
import {
  getClinicAddressLabel,
  getLocalCalendarDate,
  getUserFullName,
} from '@psychplus-v2/utils'
import { Flex, Text } from '@radix-ui/themes'
import ReactAddToCalendar from 'react-add-to-calendar'
import { BookingConfirmedIcon } from '@/components-v2'
import {
  CALENDER_ITEMS,
  CONFIRMATION_NOTES,
} from '@/features/appointments/book/constants'
import { getAppointmentDateTimeLabel } from '@/features/appointments/book/utils'
import { ClinicsMapView } from '@/features/appointments/search/ui/search-appointments-view/clinics-map-view'
import { useStore } from '../store'
import { AppointmentHeader } from './appointment-header'
import { AppointmentLocationDetails } from './appointment-location-details'
import { AppointmentProviderDetails } from './appointment-provider-details'
import { BackToHomeButton } from './buttons'

interface AppointmentsConfirmedProps {
  mapKey: string
}

const AppointmentsConfirmed = ({ mapKey }: AppointmentsConfirmedProps) => {
  const { appointment } = useStore()
  const appointmentConfirmationNotes = useMemo(() => {
    return (
      CONFIRMATION_NOTES.find((c) => c.appointmentType === appointment?.type)
        ?.notes ?? []
    )
  }, [appointment?.type])

  if (!appointment) return

  const calenderEvent = {
    title: `Appointment with ${getUserFullName(
      appointment.physicianName,
      true,
    )}`,
    startTime: appointment.startDate,
    endTime: appointment.endDate,
    description: '',
    location:
      appointment.type === AppointmentType.InPerson
        ? getClinicAddressLabel([appointment?.locationAddress])
        : '',
  }

  return (
    <>
      <AppointmentHeader
        icon={<BookingConfirmedIcon />}
        title="Your Visit is Confirmed!"
        subtitle={`See you ${getAppointmentDateTimeLabel(
          getLocalCalendarDate(appointment.startDate),
          appointment.startDate,
        )}`}
      />

      <AppointmentProviderDetails />

      <Flex
        my="4"
        py="4"
        gap="5"
        direction="column"
        className="w-full border-y border-[#E3E5F2]"
      >
        <Flex
          direction="column"
          className="w-full sm:flex-row sm:items-end sm:justify-between"
          gap="3"
        >
          <AppointmentLocationDetails />
          {appointment.type === AppointmentType.Virtual && (
            <Flex
              justify="start"
              align="end"
              className="sm:mb-[9px] sm:justify-end"
            >
              <ReactAddToCalendar
                event={calenderEvent}
                buttonLabel="Add to Calendar"
                buttonClassClosed="border border-[#151B4A] rounded-6 text-[#151B4A] px-4 py-2 cursor-pointer text-[12px] sm:text-[14px]"
                dropdownClass="absolute poopover bg-[white] mt-2 border border-gray-6 rounded-5 px-4 py-2 w-[151px] z-10"
                listItems={CALENDER_ITEMS}
              />
            </Flex>
          )}
        </Flex>

        {appointment.type === AppointmentType.InPerson && (
          <Flex className="w-full">
            <ClinicsMapView mapKey={mapKey} width="w-full" height="h-[250px]" />
          </Flex>
        )}
      </Flex>

      <Text className="text-[16px] font-medium text-[#151B4A] sm:text-[18px]">
        Notes for your visit
      </Text>

      <ul className="mt-5 list-disc pl-6">
        {appointmentConfirmationNotes.map((note) => (
          <li className="mb-2 leading-6 text-[#575759]" key={note}>
            <Text>{note}</Text>
          </li>
        ))}
      </ul>

      <BackToHomeButton />
    </>
  )
}

export { AppointmentsConfirmed }
