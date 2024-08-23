'use client'

import { FormProvider } from 'react-hook-form'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetHxButton,
  WidgetSaveButton,
  WidgetTagButton,
} from '@/components'
import { useAssessmentPlanWidgetForm } from './assessment-plan-widget-form'
import { AssessmentPlanBlock } from './blocks'

interface AssessmentPlanWidgetProps {
  patientId: string
}

const AssessmentPlanWidget = ({ patientId }: AssessmentPlanWidgetProps) => {
  const form = useAssessmentPlanWidgetForm()

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId="assessment-plan"
        title="Psychiatrist Assessment/Plan"
        getData={() => []}
        headerRight={
          <>
            <WidgetTagButton />
            <WidgetHxButton />
            <WidgetClearButton />
            <WidgetSaveButton />
          </>
        }
      >
        <AssessmentPlanBlock />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { AssessmentPlanWidget }
