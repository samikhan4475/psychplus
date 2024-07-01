'use client'

import React, { useRef } from 'react'
import { Box } from '@radix-ui/themes'
import { NEXT_PUBLIC_GOOGLE_MAPS_API_KEY } from '@psychplus/utils/constants'
import { PATIENT_INFORMATION_WIDGET } from '@psychplus/widgets'
import { usePublishLoaded, usePublishSize } from '@psychplus/widgets/hooks'
import { GooglePlacesContextProvider } from '@/providers'
import { Client } from './client'
import { PatientInfo } from './components'

const PatientInformationWidgetClient = ({
  children,
}: React.PropsWithChildren) => {
  const ref = useRef<HTMLDivElement>(null)

  usePublishLoaded(PATIENT_INFORMATION_WIDGET)
  usePublishSize(PATIENT_INFORMATION_WIDGET, ref)

  return (
    <Box className="h-screen min-h-[650px] min-w-fit" ref={ref}>
      <Client />
      <GooglePlacesContextProvider
        apiKey={NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}
      >
        <PatientInfo>{children}</PatientInfo>
      </GooglePlacesContextProvider>
    </Box>
  )
}

export { PatientInformationWidgetClient }
