'use client'

import { useSearchParams } from 'next/navigation'
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
import { CLASSNAME_CELL, CLASSNAME_HEADER_CELL } from '../shared/constants'
import { transformIn, transformOut } from '../shared/data'
import { LABELS, QUESTIONS, SCORE_INTERPRETATION_RANGES } from './constants'

const HamDTab = ({
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
    QuickNoteSectionName.QuickNoteSectionHamD,
  )
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
          patientId={patientId}
          widgetId={QuickNoteSectionName.QuickNoteSectionHamD}
          getData={transformOut(
            patientId,
            QuickNoteSectionName.QuickNoteSectionHamD,
            appointmentId,
          )}
          title={QuestionnaireTabs.HAM_D_TAB}
          headerRight={
            <Flex gap="2">
              <SendToPatientButton />
              <HistoryButton
                questionnaire={QuickNoteSectionName.QuickNoteSectionHamD}
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
            classNameHeaderCell={CLASSNAME_HEADER_CELL}
            classNameCell={CLASSNAME_CELL}
          />
        </Flex>
      </Flex>
    </FormProvider>
  )
}

export { HamDTab }
