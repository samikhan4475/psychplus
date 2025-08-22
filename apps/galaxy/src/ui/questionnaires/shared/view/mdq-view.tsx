'use client'

import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { QuickNoteSectionItem } from '@/types'
import { TOTAL_QUESTIONS } from '../../mdq-tab/constants'
import { QuestionnairesFormMdq } from '../../mdq-tab/mdq-form'
import { transformIn } from '../data'
import { useQuestionnaireForm } from '../use-questionnaire-form'

const MdqView = ({ data }: { data: QuickNoteSectionItem[] }) => {
  const initialValue = transformIn(data, TOTAL_QUESTIONS)
  const { totalScore, totalFilledQuestions, ...form } = useQuestionnaireForm(
    initialValue,
    TOTAL_QUESTIONS,
  )

  return (
    <FormProvider {...form}>
      <Flex maxWidth="100%" className="bg-white" px="3" py="1">
        <QuestionnairesFormMdq
          totalScore={totalScore}
          disabled
          Q14={form.getValues('Q14')}
          Q15={form.getValues('Q15')}
        />
      </Flex>
    </FormProvider>
  )
}

export { MdqView }
