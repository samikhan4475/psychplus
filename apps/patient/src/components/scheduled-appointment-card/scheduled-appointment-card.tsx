'use client'

import React, { useEffect, useState } from 'react'
import {
  CalendarIcon,
  ClipboardIcon,
  Cross2Icon,
  Pencil2Icon,
} from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import { format } from 'date-fns'
import { Appointment, UpcomingAppointments } from '@psychplus/appointments'
import { getUpcomingAppointments } from '@psychplus/appointments/api.client'
import { formatCurrency, formatDateToCst } from '@psychplus/utils/time'
import { ScheduleAppointmentDialog } from '@/components'
import { FutureAppointmentsDialog } from '../future-appointments-dialog'
import { MapIcon, StethoscopeIcon } from '../icons'
import {
  handleGetDirections,
  isVirtualAppointmentType,
  renderClinicAddress,
  renderSpecialistName,
} from './utils'

const ScheduledAppointmentCard = () => {
  const [upcomingAppointments, setUpcomingAppointments] =
    useState<UpcomingAppointments>()

  useEffect(() => {
    getUpcomingAppointments({ maxFutureDays: 90 }).then(setUpcomingAppointments)
  }, [])

  return (
    <Flex
      className="flex-grow rounded-6 border border-gray-2 shadow-3"
      p="8"
      direction="column"
      justify="center"
    >
      {upcomingAppointments?.appointments?.length ? (
        <Flex direction="column">
          <Flex align="center" justify="between" mb="6" gap="2">
            <Text size="8" className="font-bold">
              Next Available Appointments
            </Text>
            <FutureAppointmentsDialog
              upcomingAppointments={upcomingAppointments}
            />
          </Flex>

          <Flex className="max-xs:flex-col max-xs:gap-4 xs:flex-col xs:gap-4 sm:flex-row sm:gap-4 md:flex-row lg:flex-row ">
            {['Psychiatrist', 'Therapist'].map((type, index) => (
              <React.Fragment key={type}>
                <Flex className="w-1/2 max-xs:w-full xs:w-full sm:w-full">
                  {renderAppointment(upcomingAppointments, type)}
                </Flex>

                {index === 0 && (
                  <div className="border-r-2 border-gray-3"></div>
                )}
              </React.Fragment>
            ))}
          </Flex>
        </Flex>
      ) : (
        <Flex justify="center" direction="column" align="center" gap="3">
          <Text size="7" className="font-bold">
            Book an appointment
          </Text>
          <Flex gap="4" className="flex-row max-xs:flex-col">
            <ScheduleAppointmentDialog title="PSYCHIATRIST" />
            <ScheduleAppointmentDialog title="THERAPIST" />
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

const UpcomingAppointment = ({
  appointment,
  specialistType,
}: {
  appointment: Appointment
  specialistType: string
}) => {
  return (
    <Flex className="w-full" direction="column" gap="6">
      <Flex align="center" justify="between">
        <Text className="font-bold" size="7">
          {specialistType}
        </Text>
        <Flex gap="2">
          <Pencil2Icon color="blue" height="26" width="26" />
          <Cross2Icon color="blue" height="26" width="26" />
        </Flex>
      </Flex>
      <Flex align="center" gap="4">
        <StethoscopeIcon height="22" width="22" />
        <Text size="5">
          {renderSpecialistName(appointment?.specialist).toLocaleUpperCase()}
        </Text>
      </Flex>
      <Flex align="center" gap="4">
        <CalendarIcon height="22" width="22" />
        <Text size="5">
          {format(
            formatDateToCst(new Date(appointment?.startDate)),
            "MM/dd/yyyy 'at' hh:mm a",
          )}
        </Text>
      </Flex>
      <Flex align="center" gap="4">
        <ClipboardIcon height="22" width="22" />
        <Text size="5">Blue Shield</Text>
      </Flex>
      <Flex justify="between" align="center">
        <Flex align="center" gap="4">
          <MapIcon height="22" width="22" />
          <Text size="5" className="font-bold">
            {isVirtualAppointmentType(appointment.type)
              ? 'Virtual'
              : 'In-Person'}
          </Text>
        </Flex>

        {appointment?.type === 'TeleVisit' ? (
          <Flex direction="column" gap="2">
            <Button className="w-52 font-bold" size="3">
              JOIN
            </Button>

            <Button className="w-52 font-bold" size="3">
              CHANGE TO IN-PERSON
            </Button>
          </Flex>
        ) : (
          <Flex direction="column" gap="2">
            <Button
              className="w-52 font-bold"
              size="3"
              onClick={() =>
                handleGetDirections(
                  appointment?.clinic?.contact?.addresses?.[0],
                )
              }
            >
              GET DIRECTION
            </Button>

            <Button className="w-52 font-bold" size="3">
              CHANGE TO VIDEO
            </Button>
          </Flex>
        )}
      </Flex>
      <Flex>
        <Text size="5">{renderClinicAddress(appointment?.clinic)}</Text>
      </Flex>
      <Flex justify="between">
        <Text size="5" className="font-bold">
          Copay
        </Text>
        <Text size="5">{formatCurrency(appointment?.coPay)}</Text>
      </Flex>
      <Flex direction="column" gap="3" mt="2">
        <Button className="w-full font-bold" size="4">
          PAY COPAY
        </Button>
        <Button
          variant="outline"
          className="w-full border-2 font-bold"
          size="4"
        >
          PRE-VISIT ASSESSMENT
        </Button>
      </Flex>
    </Flex>
  )
}

const renderAppointment = (
  upcomingAppointments: UpcomingAppointments | undefined,
  specialistType: string,
) => {
  const specialistTypeCode = specialistType === 'Psychiatrist' ? 1 : 2

  const appointment = upcomingAppointments?.appointments.find(
    (appointment) => appointment.specialistTypeCode === specialistTypeCode,
  )

  return appointment ? (
    <UpcomingAppointment
      appointment={appointment}
      specialistType={specialistType}
    />
  ) : (
    <Flex justify="center" align="center" className="w-full">
      <ScheduleAppointmentDialog title={specialistType.toUpperCase()} />
    </Flex>
  )
}

export { ScheduledAppointmentCard }
