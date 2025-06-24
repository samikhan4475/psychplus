'use client'

import { FormProvider } from 'react-hook-form'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetSaveButton,
} from '@/components'
import { Appointment, QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { filterAndSort } from '@/utils'
import { AssessmentPlanTabs } from '../constants'
import {
  AssessmentSummaryBlock,
  AssessmentTreatmentPlanNotesBlock,
  PatientDiscussionCompletedBlock,
} from './blocks'
import { transformIn, transformOut } from './data'
import { createEmptyFormValues } from './psychiatry-assessment-plan-defaults'
import { PsychiatryAssessmentPlanHeader } from './psychiatry-assessment-plan-header'
import { usePsychiatryAssessmentPlanTabForm } from './psychiatry-assessment-plan-tab-form'

interface PsychiatryAssessmentPlanTabProps {
  patientId: string
  appointment: Appointment
  sectionsData?: QuickNoteSectionItem[]
  isPsychiatryAssessmentPlanTab?: boolean
}

const PsychiatryAssessmentPlanTab = ({
  patientId,
  appointment,
  sectionsData,
  isPsychiatryAssessmentPlanTab = false,
}: PsychiatryAssessmentPlanTabProps) => {
  const psychiatryAssessmentPlanData = sectionsData?.filter(
    (section) =>
      section.sectionName ===
      QuickNoteSectionName.QuicknoteSectionPsychiatryAssessmentPlan,
  )
  const codesData = sectionsData?.filter(
    (section) =>
      section.sectionName === QuickNoteSectionName.QuicknoteSectionCodes,
  )

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
        <AssessmentSummaryBlock
          codesData={codesData ?? []}
          appointment={appointment}
        />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { PsychiatryAssessmentPlanTab }
