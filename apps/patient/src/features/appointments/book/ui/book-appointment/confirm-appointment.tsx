/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { BookingConfirmedIcon, ProviderAvatar } from '@/components-v2'
import {
  CONFIRMATION_NOTES,
} from '@/features/appointments/book/constants'
import { ConfirmedAppointmentProps } from '@/features/appointments/book/types'
import { downloadICS, getAppointmentDateTimeLabel } from '@/features/appointments/book/utils'
import { ClinicsMapView } from '@/features/appointments/search/ui/search-appointments-view/clinics-map-view'
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
import { formatLocalToCustom } from '@psychplus/utils/time'
import { Box, Button, Container, Flex, Popover, Text } from '@radix-ui/themes'
import { addMinutes } from 'date-fns'
import NextLink from 'next/link'

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

  const specialistName = getUserFullName(specialist.legalName) + (specialist.legalName.honors ? ', ' + specialist.legalName.honors : '')
  const startDate = slot?.startDate

  const calenderEvent = {
    title: `Appointment with ${specialistName}`,
    startTime: formatLocalToCustom(new Date(startDate)),
    endTime: formatLocalToCustom(
      addMinutes(new Date(startDate), slot.duration),
    ),
    description: 'Appointment Scheduled',
    location: 'Psych+',
  }

  const googleEventLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calenderEvent.title}&dates=${calenderEvent.startTime}/${calenderEvent.endTime}&details=${calenderEvent.description}&location=${calenderEvent.location}`


  return (
    <Flex direction="column" className="w-full">
      <Container className="px-6 sm:px-[32%]">
        <Flex justify="center">
          <BookingConfirmedIcon className="size-[44px] md:size-[88px]" />
        </Flex>

        <Flex direction="column" align="center" my="4">
          <Text className="text-[16px] md:text-[20px] font-bold">
            Your appointment is booked!
          </Text>

          <Text className="text-[14px] md:text-[18px] text-[#194595]" weight="medium">
            See you {getAppointmentDateTimeLabel(slotDate, slot.startDate)}
          </Text>
        </Flex>

        <Flex gap="3" mt={{ initial: '2', md: '6' }} align='center'>
          <ProviderAvatar provider={specialist} size={{ initial: '4', md: '6' }} />
          <Flex direction="column" gap={{ initial: '2', md: '3' }}>
            <Text
              trim="end"
              weight="bold"
              className="text-[14px] md:text-[22px] text-[#151B4A]"
            >
              {specialistName}
            </Text>

            <Flex gap={{ initial: '1', md: '5' }}>
              <Text weight="medium" className="text-[10px] md:text-[13px] text-[#194595]">
                {getNewProviderTypeLabel(
                  newProviderType || '',
                ).toLocaleUpperCase()}
              </Text>
              <Text weight="medium" className="text-[10px] md:text-[13px] text-[#194595]">
                {getAppointmentTypeLabel(appointmentType).toLocaleUpperCase()}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex
          my={{ initial: '2', md: '3' }}
          direction="column"
          className="border-b border-t border-[#E3E5F2] py-5"
        >
          <Flex justify="between" direction={{ initial: 'column', md: 'row' }} gap="2" mb={{ initial: '0', md: '4' }}>
            <Flex className="flex flex-col" gap={{ initial: '1', md: '2' }}>
              <Text className="text-[16px] md:text-[18px]  text-[#151B4A]" weight="medium">
                {clinic.name}
              </Text>
              {appointmentType === AppointmentType.InPerson && (
                <Text className="text-[12px] md:text-[14px] leading-3 text-[#575759]">
                  {getClinicAddressLabel(clinic.contact?.addresses)}
                </Text>
              )}

              {clinic?.contact?.phoneNumbers?.[0]?.number && (
                <Text className="text-[12px] md:text-[14px] text-[#575759]">
                  Tel:{' '}
                  <Text className="text-[#194595]">
                    {getMaskedPhoneNumber(
                      clinic.contact.phoneNumbers[0].number,
                    )}
                  </Text>
                </Text>
              )}

              {clinic?.contact?.email && (
                <Text className="text-[12px] md:text-[14px] text-[#575759]">
                  Email:{' '}
                  <Text className="c text-[#194595]">
                    {clinic.contact.email}
                  </Text>
                </Text>
              )}
            </Flex>

            <Flex
              className="w-full md:w-1/2"
              justify="end"
              align="end"
              direction={'column'}
            >
              <Popover.Root>
                <Popover.Trigger>
                  <Box className="cursor-pointer rounded-6 border border-[#151B4A] px-2 sm:px-4 py-1 sm:py-2 text-[#151B4A] w-fit sm:w-full md:w-fit text-center text-[13px] sm:text-[16px] mr-[auto] sm:mr-0">
                    Add to Calendar
                  </Box>
                </Popover.Trigger>
                <Popover.Content className="rounded bg-white shadow-md px-4 py-2">
                  <Flex direction={'column'} gap="1">
                    <Text
                      className="text-[12px] sm:text-[16px] cursor-pointer px-2 py-0.5 hover:rounded-2 hover:bg-[#151B4A] hover:text-[white]"
                      onClick={() => window.open(googleEventLink, '_blank')}
                    >
                      Google
                    </Text>
                    <Text
                      className="text-[12px] sm:text-[16px] cursor-pointer px-2 py-0.5 hover:rounded-2 hover:bg-[#151B4A] hover:text-[white]"
                      onClick={() => downloadICS(calenderEvent)}
                    >
                      Outlook
                    </Text>
                    <Text
                      className="text-[12px] sm:text-[16px] cursor-pointer px-2 py-0.5 hover:rounded-2 hover:bg-[#151B4A] hover:text-[white]"
                      onClick={() => downloadICS(calenderEvent)}
                    >
                      Apple
                    </Text>
                  </Flex>
                </Popover.Content>
              </Popover.Root>
            </Flex>
          </Flex>

          <Flex
            className={cn(
              appointmentType === AppointmentType.Virtual ? null : 'mt-4 md:mt-0',
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
            <li className="mb-2 leading-6 text-[#575759] text-[14px] md:text-[16px]" key={note}>
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
