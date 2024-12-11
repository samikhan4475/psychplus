import React from 'react'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { transformIn, transformOut } from './data'
import { FilloutCurrentTab } from './fill-out'
import { QuestionnairesData, QuestionnairesForm } from './questionnaires-form'
import { ScoreInterpretationRange } from './score-interpretation'
import { useQuestionnaireForm } from './use-questionnaire-form'

type QuestionnairePopupCurrentView = React.PropsWithChildren<{
  data: QuickNoteSectionItem[]
  questions: QuestionnairesData[]
  labels: string[]
  classNameHeaderCell?: string
  classNameCell?: string
  patientId: string
  scoreInterpretationRanges: ScoreInterpretationRange[]
  quickNoteSectionName: QuickNoteSectionName
}>

const QuestionnairePopupCurrentView = ({
  data,
  questions,
  labels,
  classNameHeaderCell,
  classNameCell,
  patientId,
  scoreInterpretationRanges,
  quickNoteSectionName,
}: QuestionnairePopupCurrentView) => {
  const totalQuestions = questions.length
  const initialValue = transformIn(data, totalQuestions)
  const { totalScore, totalFilledQuestions, ...form } = useQuestionnaireForm(
    initialValue,
    totalQuestions,
  )

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          title=""
          patientId={patientId}
          widgetId={quickNoteSectionName}
          getData={transformOut(patientId, quickNoteSectionName)}
        >
          <FilloutCurrentTab
            max={Object.keys(initialValue).length}
            value={totalFilledQuestions}
          >
            <QuestionnairesForm
              data={questions}
              labels={labels}
              totalScore={totalScore}
              scoreInterpretationRanges={scoreInterpretationRanges}
              classNameHeaderCell={classNameHeaderCell}
              classNameCell={classNameCell}
            />
          </FilloutCurrentTab>
        </WidgetFormContainer>
      </Flex>
    </FormProvider>
  )
}

export { QuestionnairePopupCurrentView }
