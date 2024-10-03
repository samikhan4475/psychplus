import React from 'react'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import {
  LABELS,
  SCORE_INTERPRETATION_RANGES,
} from '@/ui/questionnaires/shared/constants'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import {
  FilloutCurrentTab,
  QuestionnairesForm,
  useQuestionnaireForm,
} from '../../shared'
import { transformIn, transformOut } from '../../shared/data'
import { QUESTIONS } from '../constants'

type FilloutCurrentView = React.PropsWithChildren<{
  patientId: string
}>

const CurrentView = ({ patientId }: FilloutCurrentView) => {
  const totalQuestions = QUESTIONS.length
  const initialValue = transformIn([], totalQuestions)
  const { totalScore, ...form } = useQuestionnaireForm(
    initialValue,
    totalQuestions,
  )

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          title=""
          enableEvents={false}
          patientId={patientId}
          widgetId="phq-9 popup"
          getData={transformOut(
            patientId,
            QuickNoteSectionName.QuickNoteSectionPhq9,
          )}
        >
          <FilloutCurrentTab max={Object.keys(initialValue).length} value={7}>
            <QuestionnairesForm
              data={QUESTIONS}
              labels={LABELS}
              totalScore={totalScore}
              scoreInterpretationRanges={SCORE_INTERPRETATION_RANGES}
            />
          </FilloutCurrentTab>
        </WidgetFormContainer>
      </Flex>
    </FormProvider>
  )
}

export { CurrentView }
