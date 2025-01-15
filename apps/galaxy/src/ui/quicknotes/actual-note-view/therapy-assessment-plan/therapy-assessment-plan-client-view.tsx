'use client'

import { QuickNoteSectionItem } from '@/types'
import { transformIn } from '@/ui/assessment-plan/therapy-assessment-plan-tab/data'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

interface TherapyAssessmentPlanViewProps {
  data?: QuickNoteSectionItem[]
}

const TherapyAssessmentPlanClientView = ({
  data,
}: TherapyAssessmentPlanViewProps) => {
  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuicknoteSectionTherapyAssessmentPlan}
    >
      <Details data={transformIn(data ?? [])} />
    </ActualNoteDetailsWrapper>
  )
}

export { TherapyAssessmentPlanClientView }
