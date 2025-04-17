'use client'

import { useEffect, useState } from 'react'
import { CallAdapterState } from '@azure/communication-react'
import { Avatar, Flex, Text } from '@radix-ui/themes'
import { WebSocketEvents, WebSocketEventType } from '@/types'
import { cn, getNameInitials } from '@/utils'
import { CallInfo } from './call-info'

export const getTimerFromNow = (date: Date): string => {
  const now = new Date()
  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60),
  )

  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`
  }

  const hours = Math.floor(diffInMinutes / 60)
  const minutes = diffInMinutes % 60
  return `${hours}h ${minutes}m ago`
}

const JoinTime = ({
  appointment,
}: {
  appointment: WebSocketEvents[WebSocketEventType.CallWaiting]
}) => {
  const [duration, setDuration] = useState('')
  useEffect(() => {
    if (!appointment.joinedAt) return
    const timer = setInterval(() => {
      if (appointment.joinedAt) {
        setDuration(getTimerFromNow(appointment.joinedAt))
      }
    }, 10000)

    return () => clearInterval(timer)
  }, [appointment.joinedAt])

  if (!appointment.joinedAt) return null
  return (
    <Text className="inline-block select-none text-[11px]">{duration}</Text>
  )
}

interface ApointmentInfoProps {
  appointment: WebSocketEvents[WebSocketEventType.CallWaiting]
  appointmentId?: string
  setAppointmentId: (appointmentId: string) => void
  callAdapterState?: CallAdapterState
}

const AppointmentInfo = ({
  appointment,
  appointmentId,
  setAppointmentId,
  callAdapterState,
}: ApointmentInfoProps) => {
  const isSelected = appointment.gv === appointmentId

  const initials = getNameInitials(appointment.sv)

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
          fallback={initials}
          radius="full"
          size="2"
          alt=""
          highContrast
          className="bg-pp-bg-accent"
        />
        <Flex direction={'column'}>
          <Text className="inline-block select-none text-[11px] font-bold">
            {appointment.sv}
          </Text>
          <JoinTime appointment={appointment} />
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
