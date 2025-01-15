'use client'

import { QuickNoteSectionItem } from '@/types'
import { transformIn } from '@/ui/assessment-plan/psychiatry-assessment-plan-tab/data'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type PastPsychHxDetailsProps = {
  data?: QuickNoteSectionItem[]
}

const PsychiatryAssessmentPlanClientView = ({
  data,
}: PastPsychHxDetailsProps) => {
  return (
    <ActualNoteDetailsWrapper
      sectionName={
        QuickNoteSectionName.QuicknoteSectionPsychiatryAssessmentPlan
      }
    >
      <Details data={transformIn(data ?? [])} />
    </ActualNoteDetailsWrapper>
  )
}

export { PsychiatryAssessmentPlanClientView }
