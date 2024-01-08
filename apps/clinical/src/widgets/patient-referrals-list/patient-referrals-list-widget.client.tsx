'use client'

import { useRef } from 'react'
import { Box } from '@radix-ui/themes'
import { PATIENT_REFERRALS_LIST_WIDGET } from '@psychplus/widgets'
import {
  usePublishLoaded,
  usePublishSize,
  useSubscribeClosePopover,
} from '@psychplus/widgets/hooks'
import { PatientReferralsTable } from './components'
import { useRefetchReferrals } from './hooks'

const PatientReferralsListWidgetClient = () => {
  const ref = useRef<HTMLDivElement>(null)

  usePublishLoaded(PATIENT_REFERRALS_LIST_WIDGET)
  usePublishSize(PATIENT_REFERRALS_LIST_WIDGET, ref)
  useSubscribeClosePopover(PATIENT_REFERRALS_LIST_WIDGET)
  useRefetchReferrals()

  return (
    <Box p="2" width="100%" className="h-full min-w-fit" ref={ref}>
      <PatientReferralsTable />
    </Box>
  )
}

export { PatientReferralsListWidgetClient }
