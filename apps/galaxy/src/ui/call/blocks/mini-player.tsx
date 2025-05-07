'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AzureCommunicationTokenCredential } from '@azure/communication-common'
import {
  CallAdapterState,
  CallComposite,
  useAzureCommunicationCallAdapter,
} from '@azure/communication-react'
import { Flex } from '@radix-ui/themes'
import { ChevronLeft, ChevronRight, ExpandIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { webSocketEventBus } from '@/lib/websocket-event-bus'
import { useStore } from '@/store'
import { WebSocketEvents, WebSocketEventType } from '@/types'
import { getTruncatedName } from '@/utils/patient'

const CALL_COMPOSITE_OPTIONS = {
  localVideoTile: false,
  callControls: {
    cameraButton: true,
    microphoneButton: true,
    raiseHandButton: false,
    participantsButton: false,
    screenShareButton: false,
    devicesButton: false,
    captionsButton: false,
    moreButton: false,
    dtmfDialerButton: false,
    peopleButton: false,
  },
  surveyOptions: {
    disableSurvey: true,
  },
} as const

const MiniPlayer = () => {
  const pathname = usePathname()
  const [isMinimized, setIsMinimized] = useState(false)
  const [uniqueGvs] = useState(() => new Set<string>())
  const router = useRouter()

  const {
    currentCall,
    setCallAdapter,
    setAppoinmentList,
    appoinmentList,
    setCurrentCall,
  } = useStore((store) => ({
    currentCall: store.currentCall,
    setCurrentCall: store.setCurrentCall,
    setCallAdapter: store.setCallAdapter,
    setAppoinmentList: store.setAppoinmentList,
    appoinmentList: store.appoinmentList,
  }))

  const updateAppointments = useCallback(
    (message: WebSocketEvents[WebSocketEventType.CallWaiting]) => {
      if (uniqueGvs.has(message.gv)) {
        return
      }
      toast(
        `${getTruncatedName(
          message.sv || '',
        )} is waiting for you in the call queue.`,
        {
          icon: '📞',
        },
      )
      uniqueGvs.add(message.gv)

      setAppoinmentList([
        ...(appoinmentList || []),
        { ...message, joinedAt: new Date() },
      ])
    },
    [uniqueGvs, appoinmentList, setAppoinmentList],
  )

  useEffect(() => {
    webSocketEventBus.on(WebSocketEventType.CallWaiting, updateAppointments)
    return () => {
      webSocketEventBus.off(WebSocketEventType.CallWaiting)
    }
  }, [updateAppointments])

  const credential = useMemo(() => {
    try {
      if (!currentCall?.acsInfo?.token || !currentCall?.acsInfo?.externalId) {
        return undefined
      }
      return new AzureCommunicationTokenCredential(currentCall.acsInfo.token)
    } catch (error) {
      console.error('Failed to create ACS credential:', error)
      return undefined
    }
  }, [currentCall?.acsInfo?.token])

  const adapterArgs = useMemo(
    () => ({
      userId: {
        communicationUserId: currentCall?.acsInfo?.externalId || '',
      },
      displayName: currentCall?.acsInfo?.staffName
        ? `${currentCall.acsInfo.staffName.firstName} ${currentCall.acsInfo.staffName.lastName}`
        : '',
      credential,
      locator: { groupId: currentCall?.appointment?.gv || '' },
    }),
    [currentCall, credential],
  )

  const callAdapter = useAzureCommunicationCallAdapter(adapterArgs)

  useEffect(() => {
    if (!callAdapter) return
    setCallAdapter(callAdapter)
    const onStateChange = (state: CallAdapterState) => {
      const participants = Object.values(state?.call?.remoteParticipants || {})
      switch (state?.call?.state) {
        case 'Disconnecting':
          callAborted()
          break

        case 'Connected':
          if (participants.length === 0) {
            toast.error('Patient has left the call')
            callAborted()
          }
          break
        default:
          break
      }
    }

    callAdapter.onStateChange(onStateChange)

    return () => {
      callAdapter.dispose()
    }
  }, [callAdapter, setCallAdapter])

  const callAborted = useCallback(() => {
    const nexList = appoinmentList?.filter((item) => {
      return item.gv !== currentCall?.appointment?.gv
    })
    setAppoinmentList(nexList || [])
    uniqueGvs.delete(currentCall?.appointment?.gv || '')
    setCallAdapter(undefined)
    setCurrentCall(null)
  }, [currentCall])

  if (pathname === '/call' || !currentCall || !callAdapter) return null

  if (isMinimized) {
    return (
      <Flex
        justify="center"
        align="center"
        p="2"
        m="2"
        position="fixed"
        bottom="0"
        right="0"
        className="rounded-full z-50 h-fit w-fit cursor-pointer bg-gray-4 hover:bg-gray-6"
        onClick={() => setIsMinimized(false)}
      >
        <ChevronLeft />
      </Flex>
    )
  }
  return (
    <Flex
      position="fixed"
      bottom="0"
      right="0"
      overflow="auto"
      className="bg-white z-50 rounded-5 border border-gray-5"
    >
      <Flex justify="center" position="relative" align="center" gap="2">
        <Flex
          justify="center"
          align="center"
          p="1"
          m="2"
          position="absolute"
          top="0"
          left="0"
          gap="2"
        >
          <Flex
            onClick={() => setIsMinimized(true)}
            className="rounded-full align-center z-50 h-fit w-fit cursor-pointer justify-center bg-gray-4 p-1 hover:bg-gray-6"
          >
            <ChevronRight />
          </Flex>

          <Flex
            className="rounded-full align-center z-50 h-fit w-fit cursor-pointer justify-center bg-gray-4 p-1 hover:bg-gray-6"
            onClick={() => router.push('/call')}
          >
            <ExpandIcon />
          </Flex>
        </Flex>

        <CallComposite adapter={callAdapter} options={CALL_COMPOSITE_OPTIONS} />
      </Flex>
    </Flex>
  )
}

export { MiniPlayer }
