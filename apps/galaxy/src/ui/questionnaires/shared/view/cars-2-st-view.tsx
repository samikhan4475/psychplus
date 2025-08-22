'use client'

import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { QuickNoteSectionItem } from '@/types'
import { QuestionnairesFormCars2St } from '../../cars-2-st-tab/cars-2-st-form'
import { TOTAL_QUESTIONS } from '../../cars-2-st-tab/constants'
import { transformIn } from '../data'
import { useQuestionnaireForm } from '../use-questionnaire-form'

const CarsStView = ({ data }: { data: QuickNoteSectionItem[] }) => {
  const initialValue = transformIn(data, TOTAL_QUESTIONS)
  const { totalScore, totalFilledQuestions, ...form } = useQuestionnaireForm(
    initialValue,
    TOTAL_QUESTIONS,
  )

  return (
    <FormProvider {...form}>
      <Flex maxWidth="100%" className="bg-white w-full" px="3" py="1">
        <QuestionnairesFormCars2St totalScore={totalScore} disabled />
      </Flex>
    </FormProvider>
  )
}

export { CarsStView }
