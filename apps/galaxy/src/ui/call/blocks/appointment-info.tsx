'use client'

import { CallAdapterState } from '@azure/communication-react'
import { Avatar, Flex, Text } from '@radix-ui/themes'
import { Appointment } from '@/types'
import { formatDateCell, formatTimeCell } from '@/ui/schedule/utils'
import { cn, getUserInitials } from '@/utils'
import { CallInfo } from './call-info'

interface ApointmentInfoProps {
  appointment: Appointment
  appointmentId?: number
  setAppointmentId: (appointmentId: number) => void
  callAdapterState?: CallAdapterState
}

const AppointmentInfo = ({
  appointment,
  appointmentId,
  setAppointmentId,
  callAdapterState,
}: ApointmentInfoProps) => {
  const appointmentDate = formatDateCell(
    appointment.appointmentDate,
    appointment.locationTimezoneId,
  )

  const appointmentTime = formatTimeCell(
    appointment.appointmentDate,
    appointment.locationTimezoneId,
  )

  const isSelected = appointment.appointmentId === appointmentId

  const [firstName = '', lastName = ''] = appointment.name?.split(' ') ?? []

  return (
    <Flex
      align="center"
      justify="between"
      p="2"
      gap="2"
      className={cn(
        'text-pp-bg-accent cursor-default',
        isSelected && 'bg-pp-states-success text-black',
      )}
    >
      <Flex gap="2">
        <Avatar
          src={undefined}
          fallback={
            appointment.name ? getUserInitials({ firstName, lastName }) : ''
          }
          radius="full"
          size="2"
          alt=""
          highContrast
          className="bg-pp-bg-accent"
        />
        <Flex direction={'column'}>
          <Text className="inline-block select-none text-[11px] font-bold">
            {appointment.name}
          </Text>
          <Text className="inline-block select-none text-[10px]">
            {`${appointmentDate} ${appointmentTime}`}
          </Text>
        </Flex>
      </Flex>

      <CallInfo
        appointment={appointment}
        setAppointmentId={setAppointmentId}
        appointmentId={appointmentId}
        callAdapterState={callAdapterState}
      />
    </Flex>
  )
}

export { AppointmentInfo }
