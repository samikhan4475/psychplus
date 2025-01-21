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
import { createEmptyFormValues } from './psychiatry-assessment-plan-defaults'

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
        tags={
          isPsychiatryAssessmentPlanTab
            ? [QuickNoteSectionName.QuicknoteSectionPsychiatryAssessmentPlan]
            : []
        }
        topHeader={
          isPsychiatryAssessmentPlanTab && <PsychiatryAssessmentPlanHeader />
        }
        formResetValues={createEmptyFormValues()}
      >
        <AssessmentTreatmentPlanNotesBlock />
        <PatientDiscussionCompletedBlock />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { PsychiatryAssessmentPlanTab }
