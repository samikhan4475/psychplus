'use client'

import { useMemo } from 'react'
import { FormProvider } from 'react-hook-form'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetSaveButton,
} from '@/components'
import { Appointment, QuickNoteSectionItem } from '@/types'
import { validateYesNoEnum } from '@/ui/mse/mse-widget/utils'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { filterAndSort } from '@/utils'
import { AssessmentPlanTabs } from '../constants'
import {
  AssessmentSummaryBlock,
  AssessmentTreatmentPlanNotesBlock,
  PatientDiscussionCompletedBlock,
  SafetyPlaningViewBlock,
  SafetyPlanningInterventionBlock,
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
  const mseData = sectionsData?.filter(
    (section) =>
      section.sectionName === QuickNoteSectionName.QuicknoteSectionMse,
  )
  const codesData = sectionsData?.filter(
    (section) =>
      section.sectionName === QuickNoteSectionName.QuicknoteSectionCodes,
  )

  const [data, restData] = filterAndSort(
    psychiatryAssessmentPlanData,
    'assessmentTreatmentPlanNotes',
  )

  const initialValue = transformIn(data, mseData ?? [])
  const form = usePsychiatryAssessmentPlanTabForm(initialValue)

  const safetyPlanningIntervention = form.watch('safetyPlanningIntervention')

  const isTcsiEnabled = useMemo(() => {
    const tcsiYesNo =
      mseData?.find((item) => item.sectionItem === 'tcsiYesNo')
        ?.sectionItemValue ?? ''
    return validateYesNoEnum(tcsiYesNo) === 'yes'
  }, [mseData])

  const shouldShowSafety = safetyPlanningIntervention || isTcsiEnabled

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

        {!isPsychiatryAssessmentPlanTab && (
          <>
            <SafetyPlanningInterventionBlock isTcsiEnabled={isTcsiEnabled} />
            {shouldShowSafety && <SafetyPlaningViewBlock />}
          </>
        )}
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { PsychiatryAssessmentPlanTab }
