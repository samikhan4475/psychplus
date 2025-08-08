import React from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { TOTAL_QUESTIONS } from '../../gq-asc-tab/constants'
import { QuestionnairesFormGqAsc } from '../../gq-asc-tab/gq-asc-form'
import { transformIn, transformOut } from '../data'
import { useQuestionnaireForm } from '../use-questionnaire-form'
import { FilloutCurrentTab } from './fill-out-current-tab'

type FilloutGqAscProps = React.PropsWithChildren<{
  sectionName: QuickNoteSectionName
  data: QuickNoteSectionItem[]
}>

const FilloutGqAsc = ({ sectionName, data }: FilloutGqAscProps) => {
  const initialValue = transformIn(data, TOTAL_QUESTIONS, sectionName, 1)
  const { totalScore, totalFilledQuestions, ...form } = useQuestionnaireForm(
    initialValue,
    TOTAL_QUESTIONS,
  )
  const appointmentId = useSearchParams().get('id') as string
  const patientId = useParams().id as string

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          patientId={patientId}
          tags={[sectionName]}
          widgetId={sectionName}
          getData={transformOut(patientId, sectionName, appointmentId)}
        >
          <FilloutCurrentTab
            max={Object.keys(initialValue).length}
            value={totalFilledQuestions}
            widgetId={sectionName}
          >
            <QuestionnairesFormGqAsc totalScore={totalScore} />
          </FilloutCurrentTab>
        </WidgetFormContainer>
      </Flex>
    </FormProvider>
  )
}

export { FilloutGqAsc }
