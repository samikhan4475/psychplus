'use client'

import React, { useRef } from 'react'
import { Box } from '@radix-ui/themes'
import { PATIENT_INFORMATION_WIDGET } from '@psychplus/widgets'
import { usePublishLoaded, usePublishSize } from '@psychplus/widgets/hooks'
import { GooglePlacesContextProvider } from '@/providers'
import { Client } from './client'
import { PatientInfo } from './components'

interface PatientInformationProps {
  googleApiKey: string
}

const PatientInformationWidgetClient = ({
  googleApiKey,
  children,
}: React.PropsWithChildren<PatientInformationProps>) => {
  const ref = useRef<HTMLDivElement>(null)

  usePublishLoaded(PATIENT_INFORMATION_WIDGET)
  usePublishSize(PATIENT_INFORMATION_WIDGET, ref)

  return (
    <Box className="h-screen min-h-[650px] min-w-fit" ref={ref}>
      <Client />
      <GooglePlacesContextProvider
        apiKey={googleApiKey ?? ''}
      >
        <PatientInfo>{children}</PatientInfo>
      </GooglePlacesContextProvider>
    </Box>
  )
}

export { PatientInformationWidgetClient }
