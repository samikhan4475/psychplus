'use client'

import { useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { ViewLoadingPlaceholder, WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QuestionnaireTabs } from '../constants'
import {
  HistoryButton,
  QuestionnairesForm,
  SaveButton,
  useQuestionnaireForm,
} from '../shared'
import { CLASSNAME_CELL, CLASSNAME_HEADER_CELL } from '../shared/constants'
import { transformIn, transformOut } from '../shared/data'
import { LABELS, QUESTIONS, SCORE_INTERPRETATION_RANGES } from './constants'
import { ScoreCalculation } from './score-calculation'

const Dast10Tab = ({
  patientId,
  data,
}: {
  patientId: string
  data: QuickNoteSectionItem[]
}) => {
  const appointmentId = useSearchParams().get('id') as string
  const totalQuestions = QUESTIONS.length
  const initialValue = transformIn(
    data,
    totalQuestions,
    QuickNoteSectionName.QuickNoteSectionDast10,
  )
  const { totalScore, ...form } = useQuestionnaireForm(
    initialValue,
    totalQuestions,
  )

  if (!data) {
    return <ViewLoadingPlaceholder title={QuestionnaireTabs.DAST_10_TAB} />
  }

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          patientId={patientId}
          widgetId={QuickNoteSectionName.QuickNoteSectionDast10}
          getData={transformOut(
            patientId,
            QuickNoteSectionName.QuickNoteSectionDast10,
            appointmentId,
          )}
          title={QuestionnaireTabs.DAST_10_TAB}
          headerRight={
            <Flex gap="2">
              <HistoryButton
                questionnaire={QuickNoteSectionName.QuickNoteSectionDast10}
              />
              <SaveButton />
            </Flex>
          }
        />
        <Flex
          maxWidth="100%"
          className="bg-white"
          px="3"
          py="1"
          direction="column"
          gap="2"
        >
          <QuestionnairesForm
            data={QUESTIONS}
            labels={LABELS}
            totalScore={totalScore}
            scoreInterpretationRanges={SCORE_INTERPRETATION_RANGES}
            classNameHeaderCell={CLASSNAME_HEADER_CELL}
            classNameCell={CLASSNAME_CELL}
          />
          <ScoreCalculation />
        </Flex>
      </Flex>
    </FormProvider>
  )
}

export { Dast10Tab }
