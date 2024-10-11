'use client'

import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { ViewLoadingPlaceholder, WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QuestionnaireTabs } from '../constants'
import {
  AddToNoteCell,
  AddToPreVisitAssessmentCell,
  HistoryButton,
  QuestionnairesForm,
  SaveButton,
  SendToPatientButton,
  useQuestionnaireForm,
} from '../shared'
import { LABELS, SCORE_INTERPRETATION_RANGES } from '../shared/constants'
import { transformIn, transformOut } from '../shared/data'
import { QUESTIONS } from './constants'
import { FillOutButtonGad7 } from './fill-out-button'

const Gad7Tab = ({
  patientId,
  data,
}: {
  patientId: string
  data: QuickNoteSectionItem[]
}) => {
  const totalQuestions = QUESTIONS.length
  const initialValue = transformIn(data, totalQuestions)
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
          enableEvents={false}
          patientId={patientId}
          widgetId={QuestionnaireTabs.GAD_7_TAB}
          getData={transformOut(
            patientId,
            QuickNoteSectionName.QuickNoteSectionGad7,
          )}
          title={QuestionnaireTabs.GAD_7_TAB}
          headerRight={
            <Flex gap="2">
              <FillOutButtonGad7 patientId={patientId} data={[]} />
              <SendToPatientButton />
              <HistoryButton
                sectionName={QuickNoteSectionName.QuickNoteSectionGad7}
                questionnaire={QuestionnaireTabs.GAD_7_TAB}
                patientId={patientId}
              />
              <SaveButton />
            </Flex>
          }
          headerLeft={
            <Flex>
              <AddToPreVisitAssessmentCell />
              <AddToNoteCell />
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
