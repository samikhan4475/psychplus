'use client'

import { FormProvider } from 'react-hook-form'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetSaveButton,
} from '@/components'
import {
  AfterHoursBlock,
  AlcoholSubstanceBlock,
  InjectionBlock,
  InteractiveComplexityBlock,
  ModifierBlock,
  PrimaryCodeBlock,
  PsychoanalysisBlock,
  QuestionnaireBlock,
  TherapyBlock,
  TobaccoCessationBlock,
} from './blocks'
import { useCodesWidgetForm } from './codes-widget-form'

interface CodesWidgetProps {
  patientId: string
}

const CodesWidget = ({ patientId }: CodesWidgetProps) => {
  const form = useCodesWidgetForm()

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId="codes"
        title="Codes"
        getData={() => []}
        headerRight={
          <>
            <WidgetClearButton />
            <WidgetSaveButton />
          </>
        }
      >
        <PrimaryCodeBlock />
        <ModifierBlock />
        <TherapyBlock />
        <QuestionnaireBlock />
        <InjectionBlock />
        <InteractiveComplexityBlock />
        <PsychoanalysisBlock />
        <TobaccoCessationBlock />
        <AlcoholSubstanceBlock />
        <AfterHoursBlock />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { CodesWidget }
