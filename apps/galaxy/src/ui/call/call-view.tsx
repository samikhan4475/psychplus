'use client'

import { useCallback, useEffect, useState } from 'react'
import { CallAdapterState } from '@azure/communication-react'
import { Flex, Text } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { MAIN_PAGE_FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { webSocketEventBus } from '@/lib/websocket-event-bus'
import { WebSocketEvents, WebSocketEventType } from '@/types'
import { AppointmentsList, CallCompositeContainer } from './blocks'
import { AcsInfo } from './types'

interface Props {
  acsInfo: AcsInfo
}

const CallView = ({ acsInfo }: Props) => {
  const isAvfeatureFlagEnabled = useFeatureFlagEnabled(
    MAIN_PAGE_FEATURE_FLAGS.ehr9475AudioVideoTelemedicine,
  )
  const [callAdapterState, setCallAdapterState] = useState<
    CallAdapterState | undefined
  >()
  const [appointmentId, setAppointmentId] = useState<string | undefined>()

  const [appointments, setAppointments] = useState<
    WebSocketEvents[WebSocketEventType.CallWaiting][]
  >([])
  const [uniqueGvs] = useState(() => new Set<string>())

  const updateAppointments = useCallback(
    (message: WebSocketEvents[WebSocketEventType.CallWaiting]) => {
      if (uniqueGvs.has(message.gv)) {
        return
      }
      uniqueGvs.add(message.gv)
      setAppointments((prev) => [...prev, { ...message, joinedAt: new Date() }])
    },
    [uniqueGvs],
  )

  useEffect(() => {
    webSocketEventBus.on(WebSocketEventType.CallWaiting, updateAppointments)

    return () => {
      webSocketEventBus.off(WebSocketEventType.CallWaiting)
    }
  }, [updateAppointments])

  const removeAppointment = useCallback(() => {
    setCallAdapterState(undefined)
    setAppointmentId('')
    setAppointments((prev) =>
      prev.filter((appointment) => appointment.gv !== appointmentId),
    )
  }, [appointmentId])

  useEffect(() => {
    const state = callAdapterState?.call?.state
    const participants = Object.values(
      callAdapterState?.call?.remoteParticipants || {},
    )

    if (state === 'Disconnecting') {
      removeAppointment()
    }
    if (state === 'Connected' && participants.length === 0) {
      toast.error('Patient has left the call')
      removeAppointment()
    }
  }, [appointmentId, callAdapterState, removeAppointment])

  if (!isAvfeatureFlagEnabled) {
    return <Text>Feature not enabled</Text>
  }

  return (
    <Flex height={'100%'}>
      <AppointmentsList
        appointments={appointments}
        appointmentId={appointmentId}
        setAppointmentId={setAppointmentId}
        callAdapterState={callAdapterState}
      />

      <Flex
        direction="column"
        justify="center"
        align="center"
        width={'80vw'}
        height={'100%'}
      >
        {appointmentId ? (
          <CallCompositeContainer
            acsInfo={acsInfo}
            appointmentId={appointmentId}
            setCallAdapterState={setCallAdapterState}
          />
        ) : (
          <Text>
            {appointments.length
              ? 'Press the "Join" button to start the call.'
              : 'There are currently no patients in the queue.'}
          </Text>
        )}
      </Flex>
    </Flex>
  )
}

export { CallView }
