'use client'

import { useEffect, useState } from 'react'
import { CallAdapterState } from '@azure/communication-react'
import { Button, Text } from '@radix-ui/themes'
import { WebSocketEvents, WebSocketEventType } from '@/types'

interface CallInfoProps {
  appointment: WebSocketEvents[WebSocketEventType.CallWaiting]
  appointmentId?: string
  setAppointmentId: (appointmentId: string) => void
  callAdapterState?: CallAdapterState
}

const getTimeFromNow = (startTime: Date) => {
  const diff = new Date().getTime() - startTime.getTime()
  const minutes = Math.floor(diff / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`
}

const CallTime = ({
  callAdapterState,
}: {
  callAdapterState?: CallAdapterState
}) => {
  const [duration, setDuration] = useState('00:00')
  const startTime = callAdapterState?.call?.startTime
  useEffect(() => {
    if (!startTime) return

    const timer = setInterval(() => {
      setDuration(getTimeFromNow(startTime))
    }, 1000)

    return () => clearInterval(timer)
  }, [startTime])

  if (!startTime) return null
  return <Text className="text-[11px]">{duration}</Text>
}

const CallInfo = ({
  appointment,
  setAppointmentId,
  appointmentId,
  callAdapterState,
}: CallInfoProps) => {
  const isSelected = appointment.gv === appointmentId

  if (!isSelected) {
    return (
      <Button
        size="1"
        highContrast
        className="bg-pp-link-text text-white"
        onClick={() => setAppointmentId(appointment?.gv)}
      >
        Join
      </Button>
    )
  }

  const callState = callAdapterState?.call?.state

  if (callState === 'Connected') {
    return <CallTime callAdapterState={callAdapterState} />
  }

  if (callState) {
    return <Text className="text-[11px]">{callState}</Text>
  }

  return (
    <Button
      size="1"
      highContrast
      className="bg-pp-link-text text-white"
      onClick={() => setAppointmentId('')}
    >
      close
    </Button>
  )
}

export { CallInfo }
