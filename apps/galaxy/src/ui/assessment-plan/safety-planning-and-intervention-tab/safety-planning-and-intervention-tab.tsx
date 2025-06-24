'use client'

import { FormProvider } from 'react-hook-form'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetSaveButton,
} from '@/components'
import { useConstants } from '@/hooks/use-constants'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { Appointment, QuickNoteSectionItem, Relationship } from '@/types'
import { RelationshipCard } from '@/ui/patient-info/patient-info-tab/relationship'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { AssessmentPlanTabs } from '../constants'
import EmergencyBlock from './block/emergency-block'
import { SafetyPlaningViewBlock } from './block/safety-planing-view-block'
import { transformIn, transformOut } from './data'
import { SafetyPlanningAndInterventionHeader } from './safety-planning-and-intervention-header'
import { createEmptyFormValues } from './safety-planning-intervention-defaults'
import { useSafetyPlanningInterventionForm } from './safety-planning-intervention-form'

interface PsychiatryAssessmentPlanTabProps {
  patientId: string
  safetyPlanningInterventionData: QuickNoteSectionItem[]
  isSafetyPlanningAndInterventionTab?: boolean
  patientRelationships: Relationship[]
  appointment: Appointment
}

const SafetyPlanningAndInterventionTab = ({
  patientId,
  safetyPlanningInterventionData,
  isSafetyPlanningAndInterventionTab = false,
  patientRelationships,
  appointment,
}: PsychiatryAssessmentPlanTabProps) => {
  const initialValue = transformIn(safetyPlanningInterventionData)
  const form = useSafetyPlanningInterventionForm(initialValue)
  const { googleApiKey } = useConstants()

  const defaultInitialValues = {
    ...createEmptyFormValues(),
    widgetContainerCheckboxField: form.watch('widgetContainerCheckboxField'),
  }
  const viewWidgetContainerCheckboxField = form.watch(
    'widgetContainerCheckboxField',
  )

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId={
          QuickNoteSectionName.QuicknoteSectionSafetyPlanningIntervention
        }
        toggleable={!isSafetyPlanningAndInterventionTab}
        title={
          !isSafetyPlanningAndInterventionTab
            ? AssessmentPlanTabs.SPAI
            : undefined
        }
        appointment={appointment}
        widgetContainerCheckboxFieldInitialValue={
          defaultInitialValues.widgetContainerCheckboxField
        }
        getData={transformOut(patientId)}
        headerRight={
          <>
            <WidgetClearButton
              shouldCheckPermission
              defaultInitialValues={defaultInitialValues}
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
        formResetValues={defaultInitialValues}
        tags={
          isSafetyPlanningAndInterventionTab
            ? [QuickNoteSectionName.QuicknoteSectionSafetyPlanningIntervention]
            : []
        }
      >
        {viewWidgetContainerCheckboxField === 'show' && (
          <>
            <SafetyPlaningViewBlock />
            <EmergencyBlock />
            <GooglePlacesContextProvider apiKey={googleApiKey}>
              <RelationshipCard
                patientId={patientId}
                title="Support System"
                patientRelationships={patientRelationships ?? []}
              />
            </GooglePlacesContextProvider>
          </>
        )}
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { SafetyPlanningAndInterventionTab }
