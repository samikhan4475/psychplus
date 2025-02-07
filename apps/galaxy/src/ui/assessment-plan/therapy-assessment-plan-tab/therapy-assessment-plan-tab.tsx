'use client'

import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer, WidgetSaveButton } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { filterAndSort } from '@/utils'
import { AssessmentPlanTabs } from '../constants'
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
  const [data, restData] = filterAndSort(
    therapyAssessmentPlanData,
    'assessmentTreatmentPlanNotes',
  )
  const initialValue = transformIn(data)
  const form = useTherapyAssessmentPlanTabForm(initialValue)

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuicknoteSectionTherapyAssessmentPlan}
        title={!isTherapyAssessmentPlanTab ? AssessmentPlanTabs.TAP : undefined}
        getData={transformOut(patientId)}
        headerRight={
          <>
            <WidgetClearButton />
            {!isTherapyAssessmentPlanTab && (
              <WidgetSaveButton shouldCheckPermission />
            )}
          </>
        }
        tags={
          isTherapyAssessmentPlanTab
            ? [QuickNoteSectionName.QuicknoteSectionTherapyAssessmentPlan]
            : []
        }
        topHeader={
          isTherapyAssessmentPlanTab && <TherapyAssessmentPlanHeader />
        }
      >
        <AssessmentTreatmentPlanNotesBlock data={restData} />
        <PatientDiscussionCompletedBlock />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { TherapyAssessmentPlanTab }
