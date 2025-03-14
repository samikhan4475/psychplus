'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CallAdapterState } from '@azure/communication-react'
import { Flex, Text } from '@radix-ui/themes'
import { MAIN_PAGE_FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { Appointment } from '@/types'
import { AppointmentsList, CallCompositeContainer } from './blocks'
import { AcsInfo } from './types'

interface Props {
  acsInfo: AcsInfo
  appointments: Appointment[]
}

const CallView = ({ appointments, acsInfo }: Props) => {
  const isAvfeatureFlagEnabled = useFeatureFlagEnabled(
    MAIN_PAGE_FEATURE_FLAGS.ehr9475AudioVideoTelemedicine,
  )

  const [callAdapterState, setCallAdapterState] = useState<CallAdapterState>()
  const searchParams = useSearchParams()
  const appId = searchParams.get('appointmentId') || ''

  const isAppointmentIdValid = appointments.some(
    (appointment) => appointment.appointmentId === Number(appId),
  )

  const [appointmentId, setAppointmentId] = useState<number | undefined>(
    isAppointmentIdValid ? Number(appId) : undefined,
  )

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
              ? 'Press the “Call” button to start the call.'
              : 'There are currently no patients in the queue.'}
          </Text>
        )}
      </Flex>
    </Flex>
  )
}

export { CallView }
