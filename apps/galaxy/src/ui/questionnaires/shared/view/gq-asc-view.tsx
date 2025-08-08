'use client'

import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { TOTAL_QUESTIONS } from '../../gq-asc-tab/constants'
import { QuestionnairesFormGqAsc } from '../../gq-asc-tab/gq-asc-form'
import { transformIn } from '../data'
import { useQuestionnaireForm } from '../use-questionnaire-form'

const GqAscView = ({ data }: { data: QuickNoteSectionItem[] }) => {
  const initialValue = transformIn(data, TOTAL_QUESTIONS)
  const { totalScore, totalFilledQuestions, ...form } = useQuestionnaireForm(
    initialValue,
    TOTAL_QUESTIONS,
  )

  return (
    <FormProvider {...form}>
      <Flex maxWidth="100%" className="bg-white" px="3" py="1">
        <QuestionnairesFormGqAsc totalScore={totalScore} disabled />
      </Flex>
    </FormProvider>
  )
}

export { GqAscView }
