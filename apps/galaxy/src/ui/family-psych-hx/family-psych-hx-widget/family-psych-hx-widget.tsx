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
import { useFamilyPsychHxWidgetForm } from './family-psych-hx-widget-form'

interface FamilyPsychHxWidgetProps {
  patientId: string
}

const FamilyPsychHxWidget = ({ patientId }: FamilyPsychHxWidgetProps) => {
  const form = useFamilyPsychHxWidgetForm()

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId="family-psych-hx"
        title="Family Psych Hx"
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

export { FamilyPsychHxWidget }
