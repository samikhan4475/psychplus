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
  SaveButton,
  SendToPatientButton,
} from '../shared'
import { transformIn, transformOut } from '../shared/data'
import { QuestionnairesForm } from '../shared/questionnaires-form'
import { useQuestionnaireForm } from '../shared/use-questionnaire-form'
import { LABELS, QUESTIONS, SCORE_INTERPRETATION_RANGES } from './constants'
import { FillOutButtonPcl5 } from './fill-out-button'

const Pcl5Tab = ({
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
    return <ViewLoadingPlaceholder title={QuestionnaireTabs.PCL_5_TAB} />
  }

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          enableEvents={false}
          patientId={patientId}
          widgetId={QuestionnaireTabs.PCL_5_TAB}
          getData={transformOut(
            patientId,
            QuickNoteSectionName.QuickNoteSectionPcl5,
          )}
          title={QuestionnaireTabs.PCL_5_TAB}
          headerRight={
            <Flex gap="2">
              <FillOutButtonPcl5 patientId={patientId} data={[]} />
              <SendToPatientButton />
              <HistoryButton
                sectionName={QuickNoteSectionName.QuickNoteSectionPcl5}
                questionnaire={QuestionnaireTabs.PCL_5_TAB}
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

export { Pcl5Tab }
