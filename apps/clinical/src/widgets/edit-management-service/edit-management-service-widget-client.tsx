'use client'

import { useRef } from 'react'
import { Flex } from '@radix-ui/themes'
import { EDIT_MANAGEMENT_SERVICE } from '@psychplus/widgets'
import {
  usePublishLoaded,
  usePublishSize,
  useSubscribeClosePopover,
} from '@psychplus/widgets/hooks'
import { ToastProvider } from '@/providers'
import { EditManagmentComponentProps } from '.'
import { ServiceForm } from './components'

const EditManagmentServiceClient = ({
  googleApiKey,
}: EditManagmentComponentProps) => {
  const ref = useRef<HTMLDivElement>(null)
  usePublishLoaded(EDIT_MANAGEMENT_SERVICE)
  usePublishSize(EDIT_MANAGEMENT_SERVICE, ref)
  useSubscribeClosePopover(EDIT_MANAGEMENT_SERVICE)

  return (
    <ToastProvider>
      <Flex
        direction={'column'}
        className="h-fit min-h-[700px] min-w-fit bg-[#F0F4FF] px-1 py-[2px]"
        ref={ref}
      >
        <ServiceForm googleApiKey={googleApiKey} />
      </Flex>
    </ToastProvider>
  )
}

export { EditManagmentServiceClient }
