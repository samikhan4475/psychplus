'use client'

import { useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QuestionnaireTabs } from '../constants'
import { SaveButton } from '../shared'
import { useStore } from '../store'
import {
  TOGRA_BLUE_LABEL,
  TOTAL_QUESTIONS,
  TOTAL_TIME_LIMIT,
} from './constants'
import { transformIn, transformOut } from './form-togra-blue/data'
import { QuestionnairesFormTogra } from './form-togra-blue/togra-form'
import { useQuestionnaireFormTograBlue } from './form-togra-blue/use-togra-form'
import { SchemaType } from './schema'
import { StartTimer } from './start-timer'
import { TograScoreSummary } from './togra-score-summary'
import { useTograTestState } from './use-togra-test-state'

const TograBlueTab = ({
  patientId,
  data,
  disabled = false,
}: {
  patientId: string
  data: QuickNoteSectionItem[]
  disabled?: boolean
}) => {
  const initialValue = transformIn(data, TOTAL_QUESTIONS)
  const { startTimer, setStartTimer } = useStore((state) => state)
  const { totalScore, ...form } = useQuestionnaireFormTograBlue(initialValue)
  const appointmentId = useSearchParams().get('id') as string
  const tograBlueStartedAt = form.watch('TograBlueStartedAt') || ''
  const tograBlueSubmittedDate = form.watch('TograBlueSubmittedDate') || ''

  const { isFormDisabled } = useTograTestState({
    data: initialValue as SchemaType,
    patientId: patientId as string,
    startTimer,
    startedAtFormValue: tograBlueStartedAt,
    submittedDateFormValue: tograBlueSubmittedDate,
    disabled,
  })

  const handleTimeStart = (value: boolean) => {
    form.setValue('TograBlueStartedAt', new Date().toISOString())
    form.setValue('TograBlueCompletedDuration', TOTAL_TIME_LIMIT.toString())
    setStartTimer(value)
  }

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          patientId={patientId}
          tags={[QuickNoteSectionName.QuicknoteSectionTograBlue]}
          widgetId={QuickNoteSectionName.QuicknoteSectionTograBlue}
          getData={transformOut(
            patientId,
            QuickNoteSectionName.QuicknoteSectionTograBlue,
            appointmentId,
          )}
          title={QuestionnaireTabs.TOGRA_BLUE_TAB}
          headerRight={
            <Flex gap="2">
              <SaveButton
                disabled={isFormDisabled || (!startTimer && !isFormDisabled)}
              />
            </Flex>
          }
        />
        {isFormDisabled && <TograScoreSummary data={initialValue} />}
        {!startTimer && !isFormDisabled && (
          <StartTimer onChange={handleTimeStart} />
        )}
        {startTimer && (
          <QuestionnairesFormTogra
            labels={TOGRA_BLUE_LABEL}
            totalScore={totalScore}
            patientId={patientId}
            disabled={isFormDisabled}
          />
        )}
      </Flex>
    </FormProvider>
  )
}

export { TograBlueTab }
