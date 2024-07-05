'use client'

import { useRef } from 'react'
import { Box } from '@radix-ui/themes'
import { PATIENT_INFORMATION_WIDGET, PATIENT_PREFERRED_PARTNERS_WIDGET } from '@psychplus/widgets'
import {
  usePublishLoaded,
  usePublishSize,
  useSubscribeParent,
} from '@psychplus/widgets/hooks'
import { PreferredPartnerTable } from './components'
import { useStore } from './store'

const PreferredPartnersWidgetClient = () => {
  const ref = useRef<HTMLDivElement>(null)
  const patientPreferredPartners = useStore(state => state.patientPreferredPartners)
  usePublishLoaded(PATIENT_PREFERRED_PARTNERS_WIDGET)
  usePublishSize(PATIENT_PREFERRED_PARTNERS_WIDGET, ref)
  useSubscribeParent(PATIENT_INFORMATION_WIDGET, PATIENT_PREFERRED_PARTNERS_WIDGET, ref)

  return (
    <Box className="h-fit min-h-[144px] min-w-fit" ref={ref}>
      <PreferredPartnerTable data={patientPreferredPartners} />
    </Box>
  )
}

export { PreferredPartnersWidgetClient }
