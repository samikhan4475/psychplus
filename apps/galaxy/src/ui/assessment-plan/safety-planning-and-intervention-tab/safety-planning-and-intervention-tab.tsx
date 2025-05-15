'use client'

import { FormProvider } from 'react-hook-form'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetSaveButton,
} from '@/components'
import { useConstants } from '@/hooks/use-constants'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { QuickNoteSectionItem, Relationship } from '@/types'
import { RelationshipCard } from '@/ui/patient-info/patient-info-tab/relationship'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { filterAndSort } from '@/utils'
import { AssessmentPlanTabs } from '../constants'
import { SafetyPlaningViewBlock } from '../psychiatry-assessment-plan-tab/blocks'
import {
  transformIn,
  transformOut,
} from '../psychiatry-assessment-plan-tab/data'
import { createEmptyFormValues } from '../psychiatry-assessment-plan-tab/psychiatry-assessment-plan-defaults'
import { usePsychiatryAssessmentPlanTabForm } from '../psychiatry-assessment-plan-tab/psychiatry-assessment-plan-tab-form'
import EmergencyBlock from './block/emergency-block'
import { SafetyPlanningAndInterventionHeader } from './safety-planning-and-intervention-header'

interface PsychiatryAssessmentPlanTabProps {
  patientId: string
  psychiatryAssessmentPlanData: QuickNoteSectionItem[]
  isSafetyPlanningAndInterventionTab?: boolean
  mseData?: QuickNoteSectionItem[]
  patientRelationships: Relationship[]
}

const SafetyPlanningAndInterventionTab = ({
  patientId,
  psychiatryAssessmentPlanData,
  isSafetyPlanningAndInterventionTab = false,
  mseData,
  patientRelationships,
}: PsychiatryAssessmentPlanTabProps) => {
  const [data] = filterAndSort(
    psychiatryAssessmentPlanData,
    'assessmentTreatmentPlanNotes',
  )
  const initialValue = transformIn(data, mseData ?? [])
  const form = usePsychiatryAssessmentPlanTabForm(initialValue)
  const { googleApiKey } = useConstants()
  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuicknoteSectionPsychiatryAssessmentPlan}
        title={
          !isSafetyPlanningAndInterventionTab
            ? AssessmentPlanTabs.SPAI
            : undefined
        }
        getData={transformOut(patientId)}
        headerRight={
          <>
            <WidgetClearButton
              shouldCheckPermission
              defaultInitialValues={createEmptyFormValues}
            />
            {!isSafetyPlanningAndInterventionTab && (
              <WidgetSaveButton shouldCheckPermission />
            )}
          </>
        }
        topHeader={
          isSafetyPlanningAndInterventionTab && (
            <SafetyPlanningAndInterventionHeader />
          )
        }
        formResetValues={createEmptyFormValues()}
      >
        <SafetyPlaningViewBlock />
        <EmergencyBlock />
        <GooglePlacesContextProvider apiKey={googleApiKey}>
          <RelationshipCard
            patientId={patientId}
            title="Support System"
            patientRelationships={patientRelationships ?? []}
          />
        </GooglePlacesContextProvider>
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { SafetyPlanningAndInterventionTab }
