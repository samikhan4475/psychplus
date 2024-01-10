'use client'

import { useRef } from 'react'
import { Flex } from '@radix-ui/themes'
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
    <Flex
      direction="column"
      className="h-fit min-h-[200px] min-w-fit"
      ref={ref}
    >
      <PatientReferralsTable />
    </Flex>
  )
}

export { PatientReferralsListWidgetClient }
