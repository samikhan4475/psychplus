'use client'

import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer, WidgetSaveButton } from '@/components'
import { Appointment } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
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
import { InsightsBlock } from './blocks/insights-block'
import { IntelligenceBlock } from './blocks/intelligence'
import { JudgementBlock } from './blocks/judgment-block'
import { transformOut } from './data'
import { MseHeader } from './mse-header'
import { useMseWidgetForm } from './mse-widget-form'
import { MseWidgetSchemaType } from './mse-widget-schema'
import { WidgetClearButton } from './widget-clear-button'

interface MseWidgetProps {
  patientId: string
  initialValue: MseWidgetSchemaType
  isMseTab: boolean
  appointment?: Appointment
}

const MseWidget = ({
  patientId,
  initialValue,
  isMseTab,
  appointment,
}: MseWidgetProps) => {
  const form = useMseWidgetForm(initialValue)

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuicknoteSectionMse}
        getData={transformOut(patientId)}
        title={!isMseTab ? 'Mental Status Exam' : undefined}
        toggleable={!isMseTab}
        appointment={appointment}
        headerRight={
          <>
            <WidgetClearButton />
            {!isMseTab && <WidgetSaveButton />}
          </>
        }
        tags={isMseTab ? [QuickNoteSectionName.QuicknoteSectionMse] : []}
        topHeader={isMseTab && <MseHeader />}
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
        <IntelligenceBlock />
        <InsightsBlock />
        <JudgementBlock />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { MseWidget }
