'use client'

import { CallAdapterState } from '@azure/communication-react'
import { Flex, Text } from '@radix-ui/themes'
import {  WebSocketEvents, WebSocketEventType } from '@/types'
import { AppointmentInfo } from './appointment-info'

interface AppointmentsListProps {
  appointments: WebSocketEvents[WebSocketEventType.CallWaiting][]
  appointmentId?: string
  setAppointmentId: (appointmentId: string) => void
  callAdapterState?: CallAdapterState
}

const AppointmentsList = ({
  appointments,
  appointmentId,
  setAppointmentId,
  callAdapterState,
}: AppointmentsListProps) => {
  return (
    <Flex
      direction="column"
      width={'20vw'}
      height={'100%'}
      className="bg-blackA-12"
    >
      <Flex
        align="center"
        justify="between"
        pt="3"
        mx="2"
        pb="2"
        gap="2"
        className="text-pp-bg-accent border-b border-whiteA-4"
      >
        <Text className="inline-block select-none text-[11px] font-[500]">
          PATIENT QUEUE
        </Text>
      </Flex>
      {appointments?.map((item) => (
        <AppointmentInfo
          key={item.gv}
          appointment={item}
          appointmentId={appointmentId}
          setAppointmentId={setAppointmentId}
          callAdapterState={callAdapterState}
        />
      ))}
    </Flex>
  )
}

export { AppointmentsList }
