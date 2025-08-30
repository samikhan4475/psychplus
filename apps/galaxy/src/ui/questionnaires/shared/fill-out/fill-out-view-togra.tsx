import React, { useMemo } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import {
  TOTAL_QUESTIONS,
  TOTAL_TIME_LIMIT,
} from '@/ui/questionnaires/togra-blue-tab/constants'
import { QuestionnairesFormTogra } from '@/ui/questionnaires/togra-blue-tab/form-togra-blue/togra-form'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { useStore } from '../../store'
import {
  transformIn,
  transformOut,
} from '../../togra-blue-tab/form-togra-blue/data'
import { useQuestionnaireFormTograBlue } from '../../togra-blue-tab/form-togra-blue/use-togra-form'
import { TograScoreSummary } from '../../togra-blue-tab/togra-score-summary'
import { useTograTestState } from '../../togra-blue-tab/use-togra-test-state'
import { FilloutCurrentTab } from './fill-out-current-tab'

type FilloutTograBlueProps = React.PropsWithChildren<{
  sectionName: QuickNoteSectionName
  data: QuickNoteSectionItem[]
}>

const FilloutTograBlue = ({ sectionName, data }: FilloutTograBlueProps) => {
  const initialValue = transformIn(data, TOTAL_QUESTIONS)
  const appointmentId = useSearchParams().get('id') as string
  const patientId = useParams().id as string
  const { startTimer } = useStore((state) => state)

  const { totalScore, totalFilledQuestions, ...form } =
    useQuestionnaireFormTograBlue(initialValue)

  const { isFormDisabled, submittedDate, startedAt } = useTograTestState({
    data: initialValue,
    patientId: patientId,
    startTimer,
    startedAtFormValue: form.getValues('TograBlueStartedAt') || '',
    submittedDateFormValue: form.getValues('TograBlueSubmittedDate') || '',
  })

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          patientId={patientId}
          tags={[sectionName]}
          widgetId={sectionName}
          getData={transformOut(patientId, sectionName, appointmentId)}
        >
          <FilloutCurrentTab
            max={TOTAL_QUESTIONS}
            value={totalFilledQuestions}
            widgetId={sectionName}
            hideSaveButton={isFormDisabled}
          >
            <QuestionnairesFormTogra
              patientId={patientId}
              disabled={isFormDisabled}
              fillOutView
              data={data}
              submittedDate={submittedDate}
              startedAt={startedAt}
            />
          </FilloutCurrentTab>
          {isFormDisabled && (
            <TograScoreSummary data={initialValue} fillOutView />
          )}
        </WidgetFormContainer>
      </Flex>
    </FormProvider>
  )
}

export { FilloutTograBlue }
