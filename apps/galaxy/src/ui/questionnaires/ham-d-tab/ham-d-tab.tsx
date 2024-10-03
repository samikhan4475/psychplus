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
import { transformIn, transformOut } from '../shared/data'
import { LABELS, QUESTIONS, SCORE_INTERPRETATION_RANGES } from './constants'
import { FillOutButtonHamD } from './fill-out-button'

const HamDTab = ({
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
    return <ViewLoadingPlaceholder title={QuestionnaireTabs.HAM_D_TAB} />
  }

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          enableEvents={false}
          patientId={patientId}
          widgetId={QuestionnaireTabs.HAM_D_TAB}
          getData={transformOut(
            patientId,
            QuickNoteSectionName.QuickNoteSectionHamD,
          )}
          title={QuestionnaireTabs.HAM_D_TAB}
          headerRight={
            <Flex gap="2">
              <FillOutButtonHamD patientId={patientId} data={data} />
              <SendToPatientButton />
              <HistoryButton />
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
            classNameHeaderCell="bg-pp-focus-bg align-middle border-pp-table-border h-5 border px-[50px] py-0"
            classNameCell="align-middle border-pp-table-border h-5 border pl-[10px] py-0.5"
          />
        </Flex>
      </Flex>
    </FormProvider>
  )
}

export { HamDTab }
