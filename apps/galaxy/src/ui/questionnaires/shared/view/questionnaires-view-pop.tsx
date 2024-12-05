import React from 'react'
import { useParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { transformIn } from '../data'
import { QuestionnairesForm } from '../questionnaires-form'
import { useQuestionnaireForm } from '../use-questionnaire-form'
import { questionnaireViewConstants } from './constant'

type QuestionnaireViewPopup = React.PropsWithChildren<{
  data: QuickNoteSectionItem[]
  quickNoteSectionName: QuickNoteSectionName
}>

const QuestionnaireViewPopup = ({
  data,
  quickNoteSectionName,
}: QuestionnaireViewPopup) => {
  const currentQuestionnaireViewConstants =
    questionnaireViewConstants(quickNoteSectionName)
  const totalQuestions = currentQuestionnaireViewConstants.questions.length
  const initialValue = transformIn(data, totalQuestions)
  const { totalScore, ...form } = useQuestionnaireForm(
    initialValue,
    totalQuestions,
  )
  const { id: patientId } = useParams()

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          title=""
          patientId={patientId as string}
          widgetId={`${currentQuestionnaireViewConstants.questionnaireTab.toLowerCase()} popup`}
          getData={() => []}
        >
          <QuestionnairesForm
            data={currentQuestionnaireViewConstants.questions}
            labels={currentQuestionnaireViewConstants.labels}
            totalScore={totalScore}
            scoreInterpretationRanges={
              currentQuestionnaireViewConstants.scoreRange
            }
            disabled
          />
        </WidgetFormContainer>
      </Flex>
    </FormProvider>
  )
}

export { QuestionnaireViewPopup }
