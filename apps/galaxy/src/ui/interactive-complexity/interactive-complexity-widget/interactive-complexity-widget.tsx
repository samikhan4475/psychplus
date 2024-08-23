'use client'

import { FormProvider } from 'react-hook-form'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetHxButton,
  WidgetSaveButton,
} from '@/components'
import { InteractiveComplexityBlock } from './blocks'
import { useInteractiveComplexityWidgetForm } from './interactive-complexity-widget-form'

interface InteractiveComplexityWidgetProps {
  patientId: string
}

const InteractiveComplexityWidget = ({
  patientId,
}: InteractiveComplexityWidgetProps) => {
  const form = useInteractiveComplexityWidgetForm()

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId="interactive-complexity"
        title="Interactive complexity in this session"
        getData={() => []}
        toggleable
        headerRight={
          <>
            <WidgetHxButton />
            <WidgetClearButton />
            <WidgetSaveButton />
          </>
        }
      >
        <InteractiveComplexityBlock />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { InteractiveComplexityWidget }
