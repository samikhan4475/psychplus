'use client'

import { FormProvider } from 'react-hook-form'
import {
  WidgetClearButton,
  WidgetFormContainer,
  WidgetHxButton,
  WidgetSaveButton,
  WidgetTagButton,
} from '@/components'
import {
  AffectBlock,
  AppearanceBlock,
  BehaviorBlock,
  MemoryBlock,
  MoodBlock,
  OrientationBlock,
  PsychomotorBlock,
  SpeechBlock,
  ThoughtContentBlock,
  ThoughtProcessBlock,
} from './blocks'
import { useMseWidgetForm } from './mse-widget-form'

interface MseWidgetProps {
  patientId: string
}

const MseWidget = ({ patientId }: MseWidgetProps) => {
  const form = useMseWidgetForm()

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId="mse"
        title="Mental Status Exam"
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
        <OrientationBlock />
        <AppearanceBlock />
        <BehaviorBlock />
        <PsychomotorBlock />
        <SpeechBlock />
        <MoodBlock />
        <AffectBlock />
        <ThoughtProcessBlock />
        <ThoughtContentBlock />
        <MemoryBlock />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { MseWidget }
