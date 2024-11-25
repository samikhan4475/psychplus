'use client'

import { useRef } from 'react'
import { Flex } from '@radix-ui/themes'
import { usePatientId } from '@psychplus/patient'
import { PATIENT_REFERRALS_LIST_WIDGET } from '@psychplus/widgets'
import {
  usePublishLoaded,
  usePublishSize,
  useSubscribeClosePopover,
} from '@psychplus/widgets/hooks'
import { PatientReferralsTable } from './components'
import { useRefetchReferrals } from './hooks'
import { useStore } from './store'

const PatientReferralsListWidgetClient = () => {
  const ref = useRef<HTMLDivElement>(null)

  usePublishLoaded(PATIENT_REFERRALS_LIST_WIDGET)
  usePublishSize(PATIENT_REFERRALS_LIST_WIDGET, ref)
  useSubscribeClosePopover(PATIENT_REFERRALS_LIST_WIDGET)
  useRefetchReferrals()
  const patientId = usePatientId(useStore)
  if (!patientId) return null

  return (
    <Flex direction="column" className="h-fit min-w-fit" ref={ref}>
      <PatientReferralsTable />
    </Flex>
  )
}

export { PatientReferralsListWidgetClient }
