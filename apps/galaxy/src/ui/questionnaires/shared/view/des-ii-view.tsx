'use client'

import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { QuickNoteSectionItem } from '@/types'
import {
  LABELS,
  QUESTIONS,
  SCORE_INTERPRETATION_RANGES,
} from '../../des-ii-tab/constants'
import { CLASSNAME_HEADER_CELL } from '../constants'
import { transformIn } from '../data'
import { QuestionnairesForm } from '../questionnaires-form'
import { useQuestionnaireForm } from '../use-questionnaire-form'
import { calculateDesiiScore } from '../utils/score-calculator'

const DesiiView = ({ data }: { data: QuickNoteSectionItem[] }) => {
  const totalQuestions = QUESTIONS.length
  const initialValue = transformIn(data, totalQuestions)
  const { totalScore, totalFilledQuestions, ...form } = useQuestionnaireForm(
    initialValue,
    totalQuestions,
    calculateDesiiScore,
  )

  return (
    <FormProvider {...form}>
      <Flex maxWidth="100%" className="bg-white" px="3" py="1">
        <QuestionnairesForm
          data={QUESTIONS}
          labels={LABELS}
          totalScore={totalScore}
          scoreInterpretationRanges={SCORE_INTERPRETATION_RANGES}
          disabled
          classNameHeaderCell={CLASSNAME_HEADER_CELL}
          classNameHeader="bg-pp-focus-bg align-middle"
        />
      </Flex>
    </FormProvider>
  )
}

export { DesiiView }
