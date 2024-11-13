'use client'

import { FormProvider } from 'react-hook-form'
import {
  WidgetFormContainer,
  WidgetHxButton,
  WidgetSaveButton,
  WidgetTagButton,
} from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { AssessmentPlanTabs, AssessmentPlanTabsId } from '../constants'
import {
  AssessmentTreatmentPlanNotesBlock,
  PatientDiscussionCompletedBlock,
} from './blocks'
import { transformIn, transformOut } from './data'
import { TherapyAssessmentPlanHeader } from './therapy-assessment-plan-header'
import { useTherapyAssessmentPlanTabForm } from './therapy-assessment-plan-tab-form'
import { WidgetClearButton } from './widget-clear-button'

interface TherapyAssessmentPlanTabProps {
  patientId: string
  therapyAssessmentPlanData: QuickNoteSectionItem[]
  isTherapyAssessmentPlanTab?: boolean
}

const TherapyAssessmentPlanTab = ({
  patientId,
  therapyAssessmentPlanData,
  isTherapyAssessmentPlanTab = false,
}: TherapyAssessmentPlanTabProps) => {
  const initialValue = transformIn(therapyAssessmentPlanData)

  const form = useTherapyAssessmentPlanTabForm(initialValue)

  return (
    <FormProvider {...form}>
      {isTherapyAssessmentPlanTab && (
        <TherapyAssessmentPlanHeader
          patientId={patientId}
          getData={transformOut(patientId)}
        />
      )}
      <WidgetFormContainer
        patientId={patientId}
        widgetId={AssessmentPlanTabsId.TAP_ID}
        title={!isTherapyAssessmentPlanTab ? AssessmentPlanTabs.TAP : undefined}
        getData={transformOut(patientId)}
        headerRight={
          <>
            <WidgetTagButton />
            {!isTherapyAssessmentPlanTab && <WidgetHxButton />}
            <WidgetClearButton />
            {!isTherapyAssessmentPlanTab && <WidgetSaveButton />}
          </>
        }
      >
        <AssessmentTreatmentPlanNotesBlock />
        <PatientDiscussionCompletedBlock />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { TherapyAssessmentPlanTab }
