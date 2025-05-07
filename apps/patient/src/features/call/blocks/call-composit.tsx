'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AzureCommunicationTokenCredential } from '@azure/communication-common'
import {
  CallComposite,
  useAzureCommunicationCallAdapter,
} from '@azure/communication-react'
import { useDebouncedCallback } from 'use-debounce'
import { LoadingPlaceholder } from '@/components-v2'
import { notifyProvider } from '../api/notify-provider'
import { AcsInfo } from '../types'

interface Props {
  acsInfo: AcsInfo
  appointmentId?: number
  username: string
}

const CallCompositeContainer = ({ acsInfo, username }: Props) => {
  const router = useRouter()
  const [connected, setConnected] = useState(false)
  const credential = useMemo(() => {
    return new AzureCommunicationTokenCredential(acsInfo.token)
  }, [acsInfo.token])

  const groupId = acsInfo.callSessionId

  const adapterArgs = useMemo(() => {
    return {
      userId: {
        communicationUserId: acsInfo.externalId,
      },
      displayName: username,
      credential,
      locator: { groupId },
    }
  }, [acsInfo.externalId, credential, groupId, username])

  const callAdapter = useAzureCommunicationCallAdapter(adapterArgs)

  const debouncedNotify = useDebouncedCallback(async () => {
    const [firstName = '', lastName = '.'] = username.split(' ')
    notifyProvider({
      staffId: acsInfo.staffId,
      patientName: { firstName, lastName },
      callSessionId: acsInfo.callSessionId,
    })
  }, 3000)

  useEffect(() => {
    callAdapter?.onStateChange((state) => {
      if (state?.call?.state === 'Connected') {
        debouncedNotify()
      } else if (state?.call?.state === 'Disconnecting') {
        router.push('/')
      }
    })
  }, [
    acsInfo.callSessionId,
    acsInfo.staffId,
    callAdapter,
    connected,
    debouncedNotify,
    router,
    username,
    setConnected,
  ])

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
