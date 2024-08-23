'use client'

import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetHxButton,
  WidgetSaveButton,
  WidgetTagButton,
} from '@/components'
import {
  ConditionsBlock,
  PsychHospitalizationsBlock,
  SuicideAttemptsBlock,
} from './blocks'
import { usePastPsychHxWidgetForm } from './past-psych-hx-widget-form'

interface PastPsychHxWidgetProps {
  patientId: string
}

const PastPsychHxWidget = ({ patientId }: PastPsychHxWidgetProps) => {
  const form = usePastPsychHxWidgetForm()

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId="past-psych-hx"
        title="Past Psych Hx"
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
        <Flex align="center" gap="2">
          <PsychHospitalizationsBlock />
          <SuicideAttemptsBlock />
        </Flex>
        <ConditionsBlock />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { PastPsychHxWidget }
