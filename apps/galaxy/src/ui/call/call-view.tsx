'use client'

import { useCallback, useEffect, useState } from 'react'
import { CallAdapterState } from '@azure/communication-react'
import { Button, Flex, Heading, Text, TextField } from '@radix-ui/themes'
import { CopyIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { MAIN_PAGE_FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { webSocketEventBus } from '@/lib/websocket-event-bus'
import { useStore } from '@/store'
import { WebSocketEvents, WebSocketEventType } from '@/types'
import { AppointmentsList, CallCompositeContainer } from './blocks'
import { AcsInfo } from './types'

interface Props {
  acsInfo: AcsInfo
}

const CallView = ({ acsInfo }: Props) => {
  const user = useStore((state) => state.user)

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

  const providerLink = `${window.location.origin}/call?staffId=${user?.staffId}`
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

  const handleCopy = () => {
    navigator.clipboard.writeText(providerLink).then(() => {
      toast.success('Copied to clipboard')
    })
  }

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
      {appointmentId ? (
        <CallCompositeContainer
          acsInfo={acsInfo}
          appointmentId={appointmentId}
          setCallAdapterState={setCallAdapterState}
        />
      ) : (
        <Flex direction={'column'} flexGrow={'1'}>
          <Flex
            py="3"
            className="bg-white h-fit px-2.5 shadow-2"
            direction="column"
            m="3"
            width={'50vw'}
          >
            <Flex direction="column" mb="4" gap="1">
              <Heading>
                Welcome, {user?.legalName.firstName}. {user?.legalName.lastName}
              </Heading>
              <Text color="gray">
                Please invite someone to your waiting room, share this link
              </Text>
            </Flex>
            <Flex gap="1">
              <TextField.Root
                size="2"
                value={providerLink}
                disabled
                className="w-full"
              />
              <Button size="2" highContrast onClick={handleCopy}>
                <CopyIcon size="20" />
                <Text>Copy</Text>
              </Button>
            </Flex>
          </Flex>
          <Flex
            width={'100%'}
            height={'80%'}
            align={'center'}
            justify={'center'}
          >
            <Text>
              {appointments.length
                ? 'Press the "Join" button to start the call.'
                : 'There are currently no patients in the queue.'}
            </Text>
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

export { CallView }
