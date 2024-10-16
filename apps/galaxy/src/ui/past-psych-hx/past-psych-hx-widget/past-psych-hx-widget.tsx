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
import { transformOut } from './data'
import { usePastPsychHxWidgetForm } from './past-psych-hx-widget-form'
import { PastPsychHxWidgetSchemaType } from './past-psych-hx-widget-schema'

interface PastPsychHxWidgetProps {
  patientId: string
  initialValue: PastPsychHxWidgetSchemaType
}

const PastPsychHxWidget = ({
  patientId,
  initialValue,
}: PastPsychHxWidgetProps) => {
  const form = usePastPsychHxWidgetForm(initialValue)

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId="past-psych-hx"
        title="Past Psych Hx"
        getData={transformOut(patientId)}
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
