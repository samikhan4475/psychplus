'use client'

import { CallComposite } from '@azure/communication-react'
import { useStore } from '@/store'

const CallCompositeContainer = () => {
  const { callAdapter } = useStore((store) => ({
    callAdapter: store.callAdapter,
  }))

  return (
    <>
      {callAdapter && (
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
      )}
    </>
  )
}

export { CallCompositeContainer }
