'use client'

import { QuickNoteSectionItem } from '@/types'
import { AlertDialog } from '../alert-dialog'
import { TherapyAssessmentPlanTab } from './therapy-assessment-plan-tab'

interface TherapyAssessmentPlanWidgetProps {
  patientId: string
  data?: QuickNoteSectionItem[]
}

const TherapyAssessmentPlanClientLoader = ({
  patientId,
  data,
}: TherapyAssessmentPlanWidgetProps) => {
  return (
    <>
      <TherapyAssessmentPlanTab
        patientId={patientId}
        therapyAssessmentPlanData={data ?? []}
      />
      <AlertDialog />
    </>
  )
}

export { TherapyAssessmentPlanClientLoader }
