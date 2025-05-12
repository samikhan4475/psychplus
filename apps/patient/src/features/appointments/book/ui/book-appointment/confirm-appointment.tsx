/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import NextLink from 'next/link'
import { AppointmentType } from '@psychplus-v2/constants'
import {
  cn,
  getAppointmentTypeLabel,
  getClinicAddressLabel,
  getLocalCalendarDate,
  getMaskedPhoneNumber,
  getNewProviderTypeLabel,
  getUserFullName,
} from '@psychplus-v2/utils'
import { Button, Container, Flex, Text } from '@radix-ui/themes'
import { addMinutes } from 'date-fns'
import AddToCalendar from 'react-add-to-calendar'
import { BookingConfirmedIcon, ProviderAvatar } from '@/components-v2'
import {
  CALENDER_ITEMS,
  CONFIRMATION_NOTES,
} from '@/features/appointments/book/constants'
import { ConfirmedAppointmentProps } from '@/features/appointments/book/types'
import { getAppointmentDateTimeLabel } from '@/features/appointments/book/utils'
import { ClinicsMapView } from '@/features/appointments/search/ui/search-appointments-view/clinics-map-view'

const ConfirmAppointment = ({
  bookedSlot,
  mapKey,
}: ConfirmedAppointmentProps) => {
  const { specialist, clinic, slot, appointmentType, newProviderType } =
    bookedSlot

  const appointmentConfirmationNotes =
    CONFIRMATION_NOTES.find((c) => c.appointmentType === appointmentType)
      ?.notes ?? []

  const slotDate = getLocalCalendarDate(slot.startDate)

  const specialistName = `${getUserFullName(specialist.legalName)}${
    specialist.legalName.honors ? `, ${specialist.legalName.honors}` : ''
  }`
  const startDate = slot?.startDate

  const calenderEvent = {
    title: `Appointment with ${specialistName}`,
    startTime: new Date(startDate),
    endTime: addMinutes(new Date(startDate), slot.duration),
    description: 'Appointment Scheduled',
    location: 'Psych+',
  }

  return (
    <Flex direction="column" className="w-full">
      <Container className="px-6 sm:px-[32%]">
        <Flex justify="center">
          <BookingConfirmedIcon />
        </Flex>

        <Flex direction="column" align="center" my="4">
          <Text className="text-[20px] font-bold sm:text-[32px]">
            Your appointment is booked!
          </Text>

          <Text className="text-[18px] text-[#194595]" weight="medium">
            See you {getAppointmentDateTimeLabel(slotDate, slot.startDate)}
          </Text>
        </Flex>

        <Flex gap="3" align="center" mt="6">
          <ProviderAvatar provider={specialist} size="6" />
          <Flex direction="column" gap="3">
            <Text
              trim="end"
              weight="bold"
              className="text-[22px] text-[#151B4A]"
            >
              {specialistName}
            </Text>

            <Flex gap="5">
              <Text weight="medium" className="text-[13px] text-[#194595]">
                {getNewProviderTypeLabel(
                  newProviderType || '',
                ).toLocaleUpperCase()}
              </Text>
              <Text weight="medium" className="text-[13px] text-[#194595]">
                {getAppointmentTypeLabel(appointmentType).toLocaleUpperCase()}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex
          my="3"
          direction="column"
          className="border-b border-t border-[#E3E5F2] py-5"
        >
          <Flex justify="between">
            <Flex className="flex flex-col" gap="2">
              <Text className="text-[18px]  text-[#151B4A]" weight="medium">
                {clinic.name}
              </Text>
              {appointmentType === AppointmentType.InPerson && (
                <Text className="text-[12px] leading-3 text-[#575759]">
                  {getClinicAddressLabel(clinic.contact?.addresses)}
                </Text>
              )}

              {clinic?.contact?.phoneNumbers?.[0]?.number && (
                <Text className="text-[12px] text-[#575759]">
                  Tel:{' '}
                  <Text className="text-[#194595]">
                    {getMaskedPhoneNumber(
                      clinic.contact.phoneNumbers[0].number,
                    )}
                  </Text>
                </Text>
              )}

              {clinic?.contact?.email && (
                <Text className="text-[12px] text-[#575759]">
                  Email:{' '}
                  <Text className="c text-[#194595]">
                    {clinic.contact.email}
                  </Text>
                </Text>
              )}
            </Flex>

            {/* <Flex className="w-1/2" justify="end" align="end">
              <AddToCalendar
                event={calenderEvent}
                buttonLabel="Add to Calendar"
                buttonClassClosed="border border-[#151B4A] rounded-6 text-[#151B4A] px-4 py-2 cursor-pointer"
                dropdownClass="absolute poopover bg-[white] mt-2 border border-gray-6 rounded-5 px-4 py-2 w-[151px] z-10"
                listItems={CALENDER_ITEMS}
              />
            </Flex> */}
          </Flex>

          <Flex
            className={cn(
              appointmentType === AppointmentType.Virtual ? null : 'mt-4',
            )}
          >
            <ClinicsMapView
              hide={appointmentType === AppointmentType.Virtual}
              mapKey={mapKey}
              width={cn(
                appointmentType === AppointmentType.Virtual ? 'w-0' : 'w-full',
              )}
              height={cn(
                appointmentType === AppointmentType.Virtual
                  ? 'h-0'
                  : 'h-[250px]',
              )}
            />
          </Flex>
        </Flex>
        <Text className="mt-4 text-[18px] text-[#151B4A]" weight="medium">
          Notes for your visit
        </Text>
        <ul className="mt-5 list-disc">
          {appointmentConfirmationNotes.map((note) => (
            <li className="mb-2 leading-6 text-[#575759]" key={note}>
              <Text className="">{note}</Text>
            </li>
          ))}
        </ul>

        <NextLink href="/">
          <Button
            className="bg-[#151B4A]"
            radius="full"
            size="3"
            highContrast
            mt="4"
          >
            <Text className="px-10">Back to Home</Text>
          </Button>
        </NextLink>
      </Container>
    </Flex>
  )
}

export { ConfirmAppointment }
