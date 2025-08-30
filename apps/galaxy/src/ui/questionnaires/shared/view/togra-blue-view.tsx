'use client'

import { useParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { QuickNoteSectionItem } from '@/types'
import { TOTAL_QUESTIONS } from '../../togra-blue-tab/constants'
import { transformIn } from '../../togra-blue-tab/form-togra-blue/data'
import { QuestionnairesFormTogra } from '../../togra-blue-tab/form-togra-blue/togra-form'
import { useQuestionnaireFormTograBlue } from '../../togra-blue-tab/form-togra-blue/use-togra-form'
import { TograScoreSummary } from '../../togra-blue-tab/togra-score-summary'

const TograBlueView = ({ data }: { data: QuickNoteSectionItem[] }) => {
  const initialValue = transformIn(data, TOTAL_QUESTIONS)
  const { totalScore, ...form } = useQuestionnaireFormTograBlue(initialValue)
  const patientId = useParams().id as string

  return (
    <FormProvider {...form}>
      <Flex
        maxWidth="100%"
        className="bg-white"
        px="3"
        py="1"
        direction="column"
        gap="2"
      >
        <QuestionnairesFormTogra
          disabled
          data={data}
          patientId={patientId}
          fillOutView
        />
        <TograScoreSummary data={initialValue} fillOutView />
      </Flex>
    </FormProvider>
  )
}

export { TograBlueView }
