'use client'

import { QuickNoteSectionItem } from '@/types'
import { transformIn } from '@/ui/assessment-plan/family-internal-medicine-assessment-plan-tab/data'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type PastPsychHxDetailsProps = {
  data?: QuickNoteSectionItem[]
}

const FamilyInternalMedicineAssessmentPlanClientView = ({
  data,
}: PastPsychHxDetailsProps) => {
  return (
    <ActualNoteDetailsWrapper
      sectionName={
        QuickNoteSectionName.QuicknoteSectionFamilyInternalMedicineAssessmentPlan
      }
    >
      <Details data={transformIn(data ?? [])} />
    </ActualNoteDetailsWrapper>
  )
}

export { FamilyInternalMedicineAssessmentPlanClientView }
