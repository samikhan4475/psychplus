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
  appointmentId: string
  setCallAdapterState: (state: CallAdapterState | undefined) => void
}

const CallCompositeContainer = ({
  acsInfo,
  appointmentId,
  setCallAdapterState,
}: Props) => {
  const credential = useMemo(() => {
    return new AzureCommunicationTokenCredential(acsInfo.token)
  }, [acsInfo.token])

  const adapterArgs = useMemo(() => {
    return {
      userId: {
        communicationUserId: acsInfo.externalId,
      },
      displayName: `${acsInfo.staffName.firstName} ${acsInfo.staffName.lastName}`,
      credential,
      locator: { groupId: appointmentId },
    }
  }, [
    acsInfo.externalId,
    acsInfo.staffName.firstName,
    acsInfo.staffName.lastName,
    credential,
    appointmentId,
  ])

  const callAdapter = useAzureCommunicationCallAdapter(adapterArgs)

  useEffect(() => {
    callAdapter?.onStateChange((state) => setCallAdapterState(state))

    return () => {
      callAdapter?.dispose()
      setCallAdapterState(undefined)
    }
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
