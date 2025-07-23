'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { FormProvider } from 'react-hook-form'
import {
  FormFieldError,
  WidgetClearButton,
  WidgetFormContainer,
  WidgetSaveButton,
} from '@/components'
import { Appointment } from '@/types'
import { ProviderType } from '@/ui/assessment-plan'
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
import { ERROR_ID } from './constants'
import { transformOut } from './data'
import { MseHeader } from './mse-header'
import { useMseWidgetForm } from './mse-widget-form'
import { MseWidgetSchemaType } from './mse-widget-schema'
import { createEmptyFormValues } from './mseDefaults'

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
  const visitSequence = useSearchParams().get('visitSequence') || ''
  const showHowTested = ['New', 'Initial'].includes(visitSequence)

  const mseShouldValidate =
    appointment &&
    [ProviderType.Psychiatry, ProviderType.Therapy].includes(
      appointment.providerType as ProviderType,
    )
  useEffect(() => {
    form.reset({
      ...form.getValues(),
      shouldValidate: mseShouldValidate ? 'yes' : 'no',
      showHowTested: showHowTested ? 'yes' : 'no',
    })
  }, [initialValue, appointment])

  const defaultInitialValues = {
    ...createEmptyFormValues(),
    shouldValidate: mseShouldValidate ? 'yes' : 'no',
    widgetContainerCheckboxField: form.watch('widgetContainerCheckboxField'),
  }

  return (
    <FormProvider {...form}>
      <WidgetFormContainer
        patientId={patientId}
        widgetId={QuickNoteSectionName.QuicknoteSectionMse}
        getData={transformOut(patientId)}
        title={!isMseTab ? 'Mental Status Exam' : undefined}
        widgetContainerCheckboxFieldInitialValue={
          initialValue.widgetContainerCheckboxField
        }
        toggleable={!isMseTab}
        appointment={appointment}
        headerRight={
          <>
            <WidgetClearButton
              defaultInitialValues={defaultInitialValues}
              shouldCheckPermission
            />
            {!isMseTab && (
              <WidgetSaveButton variant="filled" shouldCheckPermission />
            )}
          </>
        }
        formResetValues={defaultInitialValues}
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
        <FormFieldError name={ERROR_ID} />
      </WidgetFormContainer>
    </FormProvider>
  )
}

export { MseWidget }
