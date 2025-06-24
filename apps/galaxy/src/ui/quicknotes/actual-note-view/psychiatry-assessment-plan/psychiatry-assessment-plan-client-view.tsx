'use client'

import { useShallow } from 'zustand/react/shallow'
import { Appointment, QuickNoteSectionItem } from '@/types'
import { transformIn } from '@/ui/assessment-plan/psychiatry-assessment-plan-tab/data'
import { QuickNoteSectionName } from '../../constants'
import { useStore } from '../../store'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type PastPsychHxDetailsProps = {
  data?: QuickNoteSectionItem[]
  appointment?: Appointment
}

const PsychiatryAssessmentPlanClientView = ({
  data,
  appointment,
}: PastPsychHxDetailsProps) => {
  const codesData = useStore(
    useShallow(
      (state) =>
        state.actualNotewidgetsData?.[
          QuickNoteSectionName.QuicknoteSectionCodes
        ] || [],
    ),
  )

  return (
    <ActualNoteDetailsWrapper
      sectionName={
        QuickNoteSectionName.QuicknoteSectionPsychiatryAssessmentPlan
      }
    >
      <Details
        data={transformIn(data ?? [])}
        appointment={appointment as Appointment}
        codesData={codesData}
      />
    </ActualNoteDetailsWrapper>
  )
}

export { PsychiatryAssessmentPlanClientView }
