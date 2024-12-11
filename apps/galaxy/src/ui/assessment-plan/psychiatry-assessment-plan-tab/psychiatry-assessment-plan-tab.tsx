'use client'

import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer, WidgetSaveButton } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { AssessmentPlanTabs } from '../constants'
import {
  AssessmentTreatmentPlanNotesBlock,
  PatientDiscussionCompletedBlock,
} from './blocks'
import { transformIn, transformOut } from './data'
import { PsychiatryAssessmentPlanHeader } from './psychiatry-assessment-plan-header'
import { usePsychiatryAssessmentPlanTabForm } from './psychiatry-assessment-plan-tab-form'
import { WidgetClearButton } from './widget-clear-button'

interface PsychiatryAssessmentPlanTabProps {
  patientId: string
  psychiatryAssessmentPlanData: QuickNoteSectionItem[]
  isPsychiatryAssessmentPlanTab?: boolean
}

const PsychiatryAssessmentPlanTab = ({
  patientId,
  psychiatryAssessmentPlanData,
  isPsychiatryAssessmentPlanTab = false,
}: PsychiatryAssessmentPlanTabProps) => {
  const initialValue = transformIn(psychiatryAssessmentPlanData)

  const form = usePsychiatryAssessmentPlanTabForm(initialValue)

  return (
    <FormProvider {...form}>
      {isPsychiatryAssessmentPlanTab && (
        <PsychiatryAssessmentPlanHeader
          patientId={patientId}
          getData={transformOut(patientId)}
        />
      )}
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuicknoteSectionPsychiatryAssessmentPlan}
        title={
          !isPsychiatryAssessmentPlanTab ? AssessmentPlanTabs.PAP : undefined
        }
        getData={transformOut(patientId)}
        headerRight={
          <>
            <WidgetClearButton />
            {!isPsychiatryAssessmentPlanTab && <WidgetSaveButton />}
          </>
        }
      >
        <AssessmentTreatmentPlanNotesBlock />
        <PatientDiscussionCompletedBlock />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { PsychiatryAssessmentPlanTab }
