'use client'

import { QuickNoteSectionItem } from '@/types'
import { AlertDialog } from '../alert-dialog'
import { FamilyInternalMedicineAssessmentPlanTab } from './family-internal-medicine-assessment-plan-tab'

interface FamilyInternalMedicineAssessmentPlanWidgetProps {
  patientId: string
  data?: QuickNoteSectionItem[]
}

const FamilyInternalMedicineAssessmentPlanClientLoader = ({
  patientId,
  data,
}: FamilyInternalMedicineAssessmentPlanWidgetProps) => {
  return (
    <>
      <FamilyInternalMedicineAssessmentPlanTab
        patientId={patientId}
        familyInternalMedicineAssessmentPlanData={data ?? []}
      />
      <AlertDialog />
    </>
  )
}

export { FamilyInternalMedicineAssessmentPlanClientLoader }
