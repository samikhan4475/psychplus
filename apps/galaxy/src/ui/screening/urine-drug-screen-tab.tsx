'use client'

import { QuickNoteSectionItem } from '@/types'
import { UdsWidget } from '../uds'

interface PsychiatryAssessmentPlanTabProps {
  patientId: string
  urineDrugScreenData: QuickNoteSectionItem[]
}

const UrineDrugScreenTab = ({
  patientId,
  urineDrugScreenData,
}: PsychiatryAssessmentPlanTabProps) => {
  return (
    <UdsWidget
      patientId={patientId}
      data={urineDrugScreenData}
      isUdsTab={true}
    />
  )
}

export { UrineDrugScreenTab }
