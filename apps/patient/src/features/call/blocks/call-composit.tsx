'use client'

import { useMemo } from 'react'
import { AzureCommunicationTokenCredential } from '@azure/communication-common'
import {
  CallComposite,
  useAzureCommunicationCallAdapter,
} from '@azure/communication-react'
import { User } from '@psychplus-v2/auth'
import { LoadingPlaceholder } from '@/components-v2'
import { AcsInfo } from '../types'

interface Props {
  acsInfo: AcsInfo
  appointmentId?: number
  user: User
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

const CallCompositeContainer = ({ acsInfo, appointmentId, user }: Props) => {
  const credential = useMemo(() => {
    return new AzureCommunicationTokenCredential(acsInfo.token)
  }, [acsInfo.token])

  const groupId = useMemo(() => numberToGUID(appointmentId), [appointmentId])

  const adapterArgs = useMemo(() => {
    return {
      userId: {
        communicationUserId: acsInfo.externalId,
      },
      displayName: `${user.firstName} ${user.lastName}`,
      credential,
      locator: { groupId },
    }
  }, [acsInfo.externalId, credential, groupId, user.firstName, user.lastName])

  const callAdapter = useAzureCommunicationCallAdapter(adapterArgs)

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
