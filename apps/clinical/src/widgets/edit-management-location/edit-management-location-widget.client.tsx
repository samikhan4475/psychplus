'use client'

import { useRef } from 'react'
import { Flex } from '@radix-ui/themes'
import { ToastProvider } from '@psychplus/ui/toast-provider'
import { EDIT_MANAGEMENT_LOCATION_WIDGET } from '@psychplus/widgets'
import {
  usePublishLoaded,
  usePublishSize,
  useSubscribeClosePopover,
} from '@psychplus/widgets/hooks'
import { EditManagementLocationProps } from '.'
import { EditManagementLocationForm } from './components/edit-management-location-form'

const EditManagementLocationClient = ({
  googleApiKey,
}: EditManagementLocationProps) => {
  const ref = useRef<HTMLDivElement>(null)
  usePublishLoaded(EDIT_MANAGEMENT_LOCATION_WIDGET)
  usePublishSize(EDIT_MANAGEMENT_LOCATION_WIDGET, ref)
  useSubscribeClosePopover(EDIT_MANAGEMENT_LOCATION_WIDGET)

  return (
    <ToastProvider>
      <Flex
        direction={'column'}
        className="h-fit min-h-[700px] min-w-fit bg-[#F0F4FF] px-[4px] py-[2px]"
        ref={ref}
      >
        <EditManagementLocationForm googleApiKey={googleApiKey ?? ''} />
      </Flex>
    </ToastProvider>
  )
}

export { EditManagementLocationClient }
