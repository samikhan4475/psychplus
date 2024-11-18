'use client'

import { FormProvider } from 'react-hook-form'
import {
  WidgetFormContainer,
  WidgetHxButton,
  WidgetSaveButton,
  WidgetTagButton,
} from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { AssessmentPlanTabs, AssessmentPlanTabsId } from '../constants'
import {
  AssessmentTreatmentPlanNotesBlock,
  PatientDiscussionCompletedBlock,
} from './blocks'
import { transformIn, transformOut } from './data'
import { FamilyInternalMedicineAssessmentPlanHeader } from './family-internal-medicine-assessment-plan-header'
import { useFamilyInternalMedicineAssessmentPlanTabForm } from './family-internal-medicine-assessment-plan-tab-form'
import { WidgetClearButton } from './widget-clear-button'

interface FamilyInternalMedicineAssessmentPlanTabProps {
  patientId: string
  familyInternalMedicineAssessmentPlanData: QuickNoteSectionItem[]
  isFamilyInternalMedicineAssessmentPlanTab?: boolean
}

const FamilyInternalMedicineAssessmentPlanTab = ({
  patientId,
  familyInternalMedicineAssessmentPlanData,
  isFamilyInternalMedicineAssessmentPlanTab = false,
}: FamilyInternalMedicineAssessmentPlanTabProps) => {
  const initialValue = transformIn(familyInternalMedicineAssessmentPlanData)

  const form = useFamilyInternalMedicineAssessmentPlanTabForm(initialValue)

  return (
    <FormProvider {...form}>
      {isFamilyInternalMedicineAssessmentPlanTab && (
        <FamilyInternalMedicineAssessmentPlanHeader
          patientId={patientId}
          getData={transformOut(patientId)}
        />
      )}
      <WidgetFormContainer
        patientId={patientId}
        widgetId={
          QuickNoteSectionName.QuicknoteSectionFamilyInternalMedicineAssessmentPlan
        }
        title={
          !isFamilyInternalMedicineAssessmentPlanTab
            ? AssessmentPlanTabs.FIMAP
            : undefined
        }
        getData={transformOut(patientId)}
        headerRight={
          <>
            <WidgetTagButton />
            {!isFamilyInternalMedicineAssessmentPlanTab && <WidgetHxButton />}
            <WidgetClearButton />
            {!isFamilyInternalMedicineAssessmentPlanTab && <WidgetSaveButton />}
          </>
        }
      >
        <AssessmentTreatmentPlanNotesBlock />
        <PatientDiscussionCompletedBlock />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { FamilyInternalMedicineAssessmentPlanTab }
