'use client'

import { QuickNoteSectionItem } from '@/types'
import { AlertDialog } from '../alert-dialog'
import { PsychiatryAssessmentPlanTab } from './psychiatry-assessment-plan-tab'

interface PsychiatryAssessmentPlanWidgetProps {
  patientId: string
  data?: QuickNoteSectionItem[]
}

const PsychiatryAssessmentPlanClientLoader = ({
  patientId,
  data,
}: PsychiatryAssessmentPlanWidgetProps) => {
  return (
    <>
      <PsychiatryAssessmentPlanTab
        patientId={patientId}
        psychiatryAssessmentPlanData={data ?? []}
      />
      <AlertDialog />
    </>
  )
}

export { PsychiatryAssessmentPlanClientLoader }
