'use client'

import { useRef } from 'react'
import { Box } from '@radix-ui/themes'
import { LINK_ACCOUNT_WIDGET, PATIENT_INFORMATION_WIDGET } from '@psychplus/widgets'
import {
  usePublishLoaded,
  usePublishSize,
  useSubscribeParent,
} from '@psychplus/widgets/hooks'
import { LinkAccountTable } from './components'

const LinkAccountWidgetClient = () => {
  const ref = useRef<HTMLDivElement>(null)

  usePublishLoaded(LINK_ACCOUNT_WIDGET)
  usePublishSize(LINK_ACCOUNT_WIDGET, ref)
  useSubscribeParent(PATIENT_INFORMATION_WIDGET, LINK_ACCOUNT_WIDGET, ref)

  return (
    <Box className="h-fit bg-[#EEF2F6] min-h-[144px] min-w-fit" ref={ref}>
      <LinkAccountTable />
    </Box>
  )
}

export { LinkAccountWidgetClient }
