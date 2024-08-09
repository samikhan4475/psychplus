'use client'

import { useMemo, useRef } from 'react'
import { Box } from '@radix-ui/themes'
import type { PatientParams } from '@psychplus/patient'
import { EditModeContext } from '@psychplus/patient-info'
import {
  PATIENT_INFORMATION_WIDGET,
  PATIENT_RELATIONSHIPS_WIDGET,
} from '@psychplus/widgets'
import {
  usePublishLoaded,
  usePublishSize,
  useSubscribeParent,
} from '@psychplus/widgets/hooks'
import { RelationshipsTable } from './components'
import { useLockPage, useRefetchRelationships } from './hooks'

const PatientRelationshipsWidgetClient = ({ patientId }: PatientParams) => {
  const ref = useRef<HTMLDivElement>(null)

  usePublishLoaded(PATIENT_RELATIONSHIPS_WIDGET)
  usePublishSize(PATIENT_RELATIONSHIPS_WIDGET, ref)
  useSubscribeParent(
    PATIENT_INFORMATION_WIDGET,
    PATIENT_RELATIONSHIPS_WIDGET,
    ref,
  )
  useRefetchRelationships(patientId)
  const { isLocked } = useLockPage()

  const ctxValue = useMemo(
    () => ({
      editable: !isLocked,
    }),
    [isLocked],
  )

  return (
    <Box className="h-fit min-h-[144px] min-w-fit" ref={ref}>
      <EditModeContext.Provider value={ctxValue}>
        <RelationshipsTable />
      </EditModeContext.Provider>
    </Box>
  )
}

export { PatientRelationshipsWidgetClient }
