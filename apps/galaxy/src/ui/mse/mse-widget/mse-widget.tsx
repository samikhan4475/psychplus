'use client'

import { FormProvider } from 'react-hook-form'
import {
  WidgetFormContainer,
  WidgetSaveButton,
  WidgetTagButton,
} from '@/components'
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
import { HistoryButton } from './history'
import { MseHeader } from './mse-header'
import { useMseWidgetForm } from './mse-widget-form'
import { MseWidgetSchemaType } from './mse-widget-schema'
import { WidgetClearButton } from './widget-clear-button'

interface MseWidgetProps {
  patientId: string
  initialValue: MseWidgetSchemaType
  isMseTab: boolean
}

const MseWidget = ({ patientId, initialValue, isMseTab }: MseWidgetProps) => {
  const form = useMseWidgetForm(initialValue)

  return (
    <FormProvider {...form}>
      {isMseTab && (
        <MseHeader
          patientId={patientId}
          getData={transformOut(patientId)}
          sectionName={QuickNoteSectionName.QuicknoteSectionMse}
        />
      )}
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuicknoteSectionMse}
        getData={transformOut(patientId)}
        title={!isMseTab ? 'Mental Status Exam' : undefined}
        headerRight={
          <>
            <WidgetTagButton />
            {!isMseTab && (
              <HistoryButton
                patientId={patientId}
                sectionName={QuickNoteSectionName.QuicknoteSectionMse}
              />
            )}
            <WidgetClearButton />
            {!isMseTab && <WidgetSaveButton />}
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
        <IntelligenceBlock />
        <InsightsBlock />
        <JudgementBlock />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { MseWidget }
