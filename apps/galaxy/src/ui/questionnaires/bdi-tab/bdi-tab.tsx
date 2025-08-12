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
import { transformIn, transformOut } from '../shared/data'
import {
  BDI_QUESTION_LABELS,
  BDI_QUESTIONS,
  BDI_SCORE_INTERPRETATION_RANGES,
} from './constants'

const BdiTab = ({
  patientId,
  data,
}: {
  patientId: string
  data: QuickNoteSectionItem[]
}) => {
  const appointmentId = useSearchParams().get('id') as string
  const totalQuestions = BDI_QUESTIONS.length
  const initialValue = transformIn(
    data,
    totalQuestions,
    QuickNoteSectionName.QuickNoteSectionBdi,
  )
  const { totalScore, ...form } = useQuestionnaireForm(
    initialValue,
    totalQuestions,
  )

  if (!data) {
    return <ViewLoadingPlaceholder title={QuestionnaireTabs.BDI_TAB} />
  }

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          patientId={patientId}
          tags={[QuickNoteSectionName.QuickNoteSectionBdi]}
          widgetId={QuickNoteSectionName.QuickNoteSectionBdi}
          getData={transformOut(
            patientId,
            QuickNoteSectionName.QuickNoteSectionBdi,
            appointmentId,
          )}
          title={QuestionnaireTabs.BDI_TAB}
          headerRight={
            <Flex gap="2">
              <HistoryButton
                questionnaire={QuickNoteSectionName.QuickNoteSectionBdi}
              />
              <SaveButton />
            </Flex>
          }
        />
        <Flex maxWidth="100%" className="bg-white" px="3" py="1">
          <QuestionnairesForm
            data={BDI_QUESTIONS}
            labels={BDI_QUESTION_LABELS}
            totalScore={totalScore}
            scoreInterpretationRanges={BDI_SCORE_INTERPRETATION_RANGES}
          />
        </Flex>
      </Flex>
    </FormProvider>
  )
}

export { BdiTab }
