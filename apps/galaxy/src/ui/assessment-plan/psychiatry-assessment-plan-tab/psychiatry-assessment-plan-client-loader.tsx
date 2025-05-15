'use client'

import { useMemo } from 'react'
import { dequal } from 'dequal'
import { Appointment, QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { useStore } from '@/ui/quicknotes/store'
import { AlertDialog } from '../alert-dialog'
import { PsychiatryAssessmentPlanTab } from './psychiatry-assessment-plan-tab'

interface PsychiatryAssessmentPlanWidgetProps {
  patientId: string
  appointment: Appointment
  data?: QuickNoteSectionItem[]
}

const PsychiatryAssessmentPlanClientLoader = ({
  patientId,
  appointment,
  data,
}: PsychiatryAssessmentPlanWidgetProps) => {
  const { codesData, psychiatryAssessmentPlan, mseData } = useStore(
    (state) => ({
      codesData:
        state.actualNotewidgetsData?.[
          QuickNoteSectionName.QuicknoteSectionCodes
        ] ?? [],
      psychiatryAssessmentPlan:
        state.actualNotewidgetsData?.[
          QuickNoteSectionName.QuicknoteSectionPsychiatryAssessmentPlan
        ] ?? data,
      mseData:
        state.actualNotewidgetsData?.[
          QuickNoteSectionName.QuicknoteSectionMse
        ] ?? [],
    }),
    dequal,
  )

  const sectionsData = useMemo(() => {
    return [...codesData, ...psychiatryAssessmentPlan, ...mseData]
  }, [codesData, psychiatryAssessmentPlan, mseData])

  return (
    <>
      <PsychiatryAssessmentPlanTab
        patientId={patientId}
        appointment={appointment}
        sectionsData={sectionsData ?? []}
      />
      <AlertDialog />
    </>
  )
}

export { PsychiatryAssessmentPlanClientLoader }
