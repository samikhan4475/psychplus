/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { getMaskedPhoneNumber } from '@psychplus-v2/utils'
import { Container, Flex, Text } from '@radix-ui/themes'
import { addMinutes, format } from 'date-fns'
import { NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN } from '@psychplus/utils/constants'
import { usePubsub } from '@psychplus/utils/event'
import { formatDateToCst, formatLocaleDate } from '@psychplus/utils/time'
import { SCHEDULE_APPOINTMENT_LIST } from '@psychplus/widgets'
import { usePublishSize } from '@psychplus/widgets/hooks'
import AppointmentDetailCard from '@/components/appointment-detail-card/appointment-detail-card'
import { psychPlusBlueColor, whiteColor } from '@/components/colors'
import { LocationMap } from '@/widgets/schedule-appointment-list/components'
import { confirmationNotes } from '@/widgets/schedule-appointment-list/constants'
import { useStore } from '@/widgets/schedule-appointment-list/store'
import { BookedSlot } from '@/widgets/schedule-appointment-list/store/types'
import { renderStaffName } from '@/widgets/schedule-appointment-list/utils'

const ConfirmationPage = () => {
  const ref = React.useRef<HTMLDivElement>(null)
  usePublishSize(SCHEDULE_APPOINTMENT_LIST, ref)

  const { publish } = usePubsub()
  const { bookedSlot } = useStore()

  const [bookedSlotState, setBookedSlotState] = useState<
    BookedSlot | undefined
  >()

  useEffect(() => {
    setBookedSlotState(bookedSlot)
  }, [bookedSlot])

  const appointmentConfirmationNotes =
    confirmationNotes.find((c) => c.appointmentType === bookedSlotState?.type)
      ?.notes ?? []

  const calendarAppointmentTitle = `Appointment with${renderStaffName(
    bookedSlotState?.specialist,
  )}`
  const startDate = formatDateToCst(bookedSlot?.startDate ?? new Date())
  const endDate = addMinutes(startDate, 30)

  const googleEventLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calendarAppointmentTitle}&dates=${format(
    startDate,
    "yyyyMMdd'T'HHmmss'Z'",
  )}/${format(endDate, "yyyyMMdd'T'HHmmss'Z'")}`

  return (
    <Flex direction="column" className="w-full" ref={ref}>
      <Container
        className="px-6 sm:px-[32%]"
        style={{
          color: psychPlusBlueColor,
        }}
      >
        <Text as="p" className="text-[26px] font-bold sm:text-[32px]">
          Your appointment is booked!
        </Text>

        <Text as="p" className="mb-6 mt-2 text-[18px] font-bold text-[#194595]">
          See you on{' '}
          {formatLocaleDate(new Date(bookedSlotState?.startDate ?? new Date()))}{' '}
        </Text>

        <AppointmentDetailCard className="my-3" />

        <Flex
          direction="column"
          className="border-b border-t border-[#E3E5F2] py-5"
        >
          <Flex justify="between">
            <Flex className="flex flex-col" gap="2">
              <Text as="p" className="text-[18px] font-bold text-[#151B4A]">
                {bookedSlotState?.clinic?.name}
              </Text>
              {bookedSlotState?.type === 'In-Person' && (
                <Text className="text-[12px] leading-3 text-[#575759]" as="p">
                  {bookedSlotState?.clinic?.contact?.addresses?.[0].street1}{' '}
                  <br />
                  {bookedSlotState?.clinic?.contact?.addresses?.[0].city}
                  {', '}
                  {bookedSlotState?.clinic?.contact?.addresses?.[0].state}{' '}
                  {bookedSlotState?.clinic?.contact?.addresses?.[0].postalCode}
                </Text>
              )}

              {bookedSlotState?.clinic?.contact?.phoneNumbers?.[0]?.number && (
                <Text className="text-[12px] text-[#575759]" as="p">
                  Tel:{' '}
                  <Text className="text-[#194595]">
                    {getMaskedPhoneNumber(
                      bookedSlotState.clinic.contact.phoneNumbers[0].number,
                    )}
                  </Text>
                </Text>
              )}
              {bookedSlotState?.clinic?.contact?.email && (
                <Text className="text-[12px] text-[#575759]" as="p">
                  Email:{' '}
                  <Text className="text-[#194595]">
                    {bookedSlotState.clinic.contact.email}
                  </Text>
                </Text>
              )}
            </Flex>

            {/* <Flex className="w-1/2" justify="end" align="end">
              <button
                className="w-[70%] rounded-[100px] border py-[10px] text-[14px] sm:w-[50%]"
                onClick={() => window.open(googleEventLink, '_blank')}
              >
                Add to Calendar
              </button>
            </Flex> */}
          </Flex>
          {bookedSlotState?.type === 'In-Person' &&
            NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN && (
              <Flex className="mt-4">
                <LocationMap
                  width={640}
                  height={250}
                  zoom={17}
                  locations={[
                    {
                      name: bookedSlotState?.clinic?.name ?? '',
                      geoCoordinates: {
                        latitude:
                          bookedSlotState?.clinic?.contact?.addresses?.[0]
                            .geoCoordinates?.latitude ?? 0,
                        longitude:
                          bookedSlotState?.clinic?.contact?.addresses?.[0]
                            .geoCoordinates?.longitude ?? 0,
                      },
                    },
                  ]}
                />
              </Flex>
            )}
        </Flex>
        <Text as="p" className="mt-4 text-[18px] font-bold text-[#151B4A]">
          Notes for your visit
        </Text>
        <ul className="mt-5 list-disc">
          {appointmentConfirmationNotes.map((note) => (
            <li className="mb-2 leading-6 text-[#575759]" key={note}>
              <Text className="">{note}</Text>
            </li>
          ))}
        </ul>

        <button
          className="mt-6 rounded-[40px] px-[40px] py-[13px] text-5 font-bold sm:px-[56px] sm:py-[16px]"
          style={{
            color: whiteColor,
            background: psychPlusBlueColor,
          }}
          onClick={() => {
            publish(`${SCHEDULE_APPOINTMENT_LIST}:done`)
          }}
        >
          Back to Home
        </button>
      </Container>
    </Flex>
  )
}

export default ConfirmationPage
