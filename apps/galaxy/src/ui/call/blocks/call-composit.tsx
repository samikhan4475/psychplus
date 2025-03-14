'use client'

import { useEffect, useMemo } from 'react'
import { AzureCommunicationTokenCredential } from '@azure/communication-common'
import {
  CallAdapterState,
  CallComposite,
  useAzureCommunicationCallAdapter,
} from '@azure/communication-react'
import { LoadingPlaceholder } from '@/components'
import { AcsInfo } from '../types'

interface Props {
  acsInfo: AcsInfo
  appointmentId: number
  setCallAdapterState: (state: CallAdapterState) => void
}

function numberToGUID(number?: number): string {
  if (!number) return ''
  const hexString = number.toString(16).padStart(32, '0')
  return [
    hexString.slice(0, 8),
    hexString.slice(8, 12),
    hexString.slice(12, 16),
    hexString.slice(16, 20),
    hexString.slice(20),
  ].join('-')
}

const CallCompositeContainer = ({
  acsInfo,
  appointmentId,
  setCallAdapterState,
}: Props) => {
  const credential = useMemo(() => {
    return new AzureCommunicationTokenCredential(acsInfo.token)
  }, [acsInfo.token])

  const groupId = useMemo(() => numberToGUID(appointmentId), [appointmentId])
  const adapterArgs = useMemo(() => {
    return {
      userId: {
        communicationUserId: acsInfo.externalId,
      },
      displayName: `${acsInfo.staffName.firstName} ${acsInfo.staffName.lastName}`,
      credential,
      locator: { groupId },
    }
  }, [
    acsInfo.externalId,
    acsInfo.staffName.firstName,
    acsInfo.staffName.lastName,
    credential,
    groupId,
  ])

  const callAdapter = useAzureCommunicationCallAdapter(adapterArgs)

  useEffect(() => {
    callAdapter?.onStateChange((state) => setCallAdapterState(state))
  }, [callAdapter, setCallAdapterState])

  if (!callAdapter) {
    return <LoadingPlaceholder />
  }

  return (
    <CallComposite
      adapter={callAdapter}
      options={{
        callControls: {
          cameraButton: true,
          microphoneButton: true,
          screenShareButton: true,
        },
        surveyOptions: {
          disableSurvey: true,
        },
      }}
    />
  )
}

export { CallCompositeContainer }
