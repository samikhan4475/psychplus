import React from 'react'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { transformIn } from '../data'
import { PaginationConfig, QuestionnairesForm } from '../questionnaires-form'
import { useQuestionnaireForm } from '../use-questionnaire-form'
import { questionnaireViewConstants } from './constant'

type QuestionnaireViewCommonProps = React.PropsWithChildren<{
  data: QuickNoteSectionItem[]
  quickNoteSectionName: QuickNoteSectionName
}>

const QuestionnaireViewCommon = ({
  data,
  quickNoteSectionName,
}: QuestionnaireViewCommonProps) => {
  const questionnaire = questionnaireViewConstants(quickNoteSectionName)
  const totalQuestions = questionnaire.questions?.length || 0
  const initialValue = transformIn(data, totalQuestions)
  const { totalScore, ...form } = useQuestionnaireForm(
    initialValue,
    totalQuestions,
  )

  const otherQuestionnaire =
    questionnaire.questions &&
    questionnaire.labels &&
    (questionnaire.scoreRange || questionnaire?.pagination)
    
  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        {otherQuestionnaire && (
          <QuestionnairesForm
            data={questionnaire.questions}
            labels={questionnaire.labels}
            totalScore={totalScore}
            scoreInterpretationRanges={
              questionnaire?.pagination ? [] : questionnaire.scoreRange
            }
            disabled
            pagination={questionnaire?.pagination as PaginationConfig}
          />
        )}
      </Flex>
    </FormProvider>
  )
}

export { QuestionnaireViewCommon }
