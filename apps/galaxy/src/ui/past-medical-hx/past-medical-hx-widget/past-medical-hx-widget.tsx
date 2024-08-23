'use client'

import { FormProvider } from 'react-hook-form'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetHxButton,
  WidgetSaveButton,
  WidgetTagButton,
} from '@/components'
import { ConditionsBlock } from './blocks'
import { usePastMedicalHxWidgetForm } from './past-medical-hx-widget-form'

interface PastMedicalHxWidgetProps {
  patientId: string
}

const PastMedicalHxWidget = ({ patientId }: PastMedicalHxWidgetProps) => {
  const form = usePastMedicalHxWidgetForm()

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId="past-medical-hx"
        title="Past Medical Hx"
        getData={() => []}
        toggleable
        headerRight={
          <>
            <WidgetTagButton />
            <WidgetHxButton />
            <WidgetClearButton />
            <WidgetSaveButton />
          </>
        }
      >
        <ConditionsBlock />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { PastMedicalHxWidget }
