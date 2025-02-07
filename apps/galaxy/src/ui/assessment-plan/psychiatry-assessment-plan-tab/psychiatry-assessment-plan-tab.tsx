'use client'

import { FormProvider } from 'react-hook-form'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetSaveButton,
} from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { filterAndSort } from '@/utils'
import { AssessmentPlanTabs } from '../constants'
import {
  AssessmentTreatmentPlanNotesBlock,
  PatientDiscussionCompletedBlock,
} from './blocks'
import { transformIn, transformOut } from './data'
import { createEmptyFormValues } from './psychiatry-assessment-plan-defaults'
import { PsychiatryAssessmentPlanHeader } from './psychiatry-assessment-plan-header'
import { usePsychiatryAssessmentPlanTabForm } from './psychiatry-assessment-plan-tab-form'

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
  const [data, restData] = filterAndSort(
    psychiatryAssessmentPlanData,
    'assessmentTreatmentPlanNotes',
  )
  const initialValue = transformIn(data)
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
            <WidgetClearButton
              shouldCheckPermission
              defaultInitialValues={createEmptyFormValues}
            />
            {!isPsychiatryAssessmentPlanTab && (
              <WidgetSaveButton shouldCheckPermission />
            )}
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
        <AssessmentTreatmentPlanNotesBlock data={restData} />
        <PatientDiscussionCompletedBlock />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { PsychiatryAssessmentPlanTab }
