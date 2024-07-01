'use client'

import { useRef } from 'react'
import { Box } from '@radix-ui/themes'
import { PATIENT_INFORMATION_WIDGET, PATIENT_RELATIONSHIPS_WIDGET } from '@psychplus/widgets'
import {
  usePublishLoaded,
  usePublishSize,
  useSubscribeParent,
} from '@psychplus/widgets/hooks'
import { RelationshipsTable } from './components'

const PatientRelationshipsWidgetClient = () => {
  const ref = useRef<HTMLDivElement>(null)

  usePublishLoaded(PATIENT_RELATIONSHIPS_WIDGET)
  usePublishSize(PATIENT_RELATIONSHIPS_WIDGET, ref)
  useSubscribeParent(PATIENT_INFORMATION_WIDGET, PATIENT_RELATIONSHIPS_WIDGET, ref)

  return (
    <Box className="h-fit bg-[#EEF2F6] min-h-[144px] min-w-fit" ref={ref}>
      <RelationshipsTable />
    </Box>
  )
}

export { PatientRelationshipsWidgetClient }
