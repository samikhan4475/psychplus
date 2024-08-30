'use client'

import { useRef } from 'react'
import { Flex } from '@radix-ui/themes'
import { ToastProvider } from '@psychplus/ui/toast-provider'
import { MANAGEMENT_LOCATIONS_WIDGET } from '@psychplus/widgets'
import { usePublishLoaded, usePublishSize } from '@psychplus/widgets/hooks'
import { LocationView } from './components/location-view'

const ManagementLocationsWidgetClient = () => {
  const ref = useRef<HTMLDivElement>(null)

  usePublishLoaded(MANAGEMENT_LOCATIONS_WIDGET)
  usePublishSize(MANAGEMENT_LOCATIONS_WIDGET, ref)

  return (
    <ToastProvider>
      <Flex direction="column" className="h-fit min-w-fit" ref={ref}>
        <LocationView />
      </Flex>
    </ToastProvider>
  )
}

export { ManagementLocationsWidgetClient }
