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
import { LABELS, QUESTIONS, SCORE_INTERPRETATION_RANGES } from './constants'

const Gad7Tab = ({
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
    QuickNoteSectionName.QuickNoteSectionGad7,
  )
  const { totalScore, ...form } = useQuestionnaireForm(
    initialValue,
    totalQuestions,
  )

  if (!data) {
    return <ViewLoadingPlaceholder title={QuestionnaireTabs.GAD_7_TAB} />
  }

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          patientId={patientId}
          widgetId={QuickNoteSectionName.QuickNoteSectionGad7}
          getData={transformOut(
            patientId,
            QuickNoteSectionName.QuickNoteSectionGad7,
            appointmentId,
          )}
          title={QuestionnaireTabs.GAD_7_TAB}
          headerRight={
            <Flex gap="2">
              <HistoryButton
                questionnaire={QuickNoteSectionName.QuickNoteSectionGad7}
              />
              <SaveButton />
            </Flex>
          }
        />
        <Flex maxWidth="100%" className="bg-white" px="3" py="1">
          <QuestionnairesForm
            data={QUESTIONS}
            labels={LABELS}
            totalScore={totalScore}
            scoreInterpretationRanges={SCORE_INTERPRETATION_RANGES}
          />
        </Flex>
      </Flex>
    </FormProvider>
  )
}

export { Gad7Tab }
