'use client'

import { useEffect, useState } from 'react'
import { Avatar, Flex, Text } from '@radix-ui/themes'
import { useStore } from '@/store'
import { WebSocketEvents, WebSocketEventType } from '@/types'
import { cn, getNameInitials } from '@/utils'
import { AcsInfo } from '../types'
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
  appointment?: WebSocketEvents[WebSocketEventType.CallWaiting]
}) => {
  const [duration, setDuration] = useState('')
  useEffect(() => {
    const joinedAt = appointment?.joinedAt
    if (!joinedAt) return
    setDuration(getTimerFromNow(joinedAt))
    const timer = setInterval(() => {
      if (joinedAt) {
        setDuration(getTimerFromNow(joinedAt))
      }
    }, 10000)

    return () => clearInterval(timer)
  }, [appointment?.joinedAt])

  if (!appointment?.joinedAt) return null
  return (
    <Text className="inline-block select-none text-[11px]">{duration}</Text>
  )
}

interface ApointmentInfoProps {
  appointment: WebSocketEvents[WebSocketEventType.CallWaiting]
  acsInfo: AcsInfo
}

const AppointmentInfo = ({ appointment, acsInfo }: ApointmentInfoProps) => {
  const { currentCall } = useStore((state) => ({
    currentCall: state.currentCall,
  }))

  const isSelected = appointment.gv === currentCall?.appointment?.gv

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
          <Text className="inline-block max-w-[150px] select-none truncate text-[11px] font-bold">
            {appointment.sv}
          </Text>
          <JoinTime appointment={appointment} />
        </Flex>
      </Flex>

      <CallInfo appointment={appointment} acsInfo={acsInfo} />
    </Flex>
  )
}

export { AppointmentInfo }
