import React from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuestionnairesFormCars2St } from '@/ui/questionnaires/cars-2-st-tab/cars-2-st-form'
import { TOTAL_QUESTIONS } from '@/ui/questionnaires/cars-2-st-tab/constants'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { transformIn, transformOut } from '../data'
import { useQuestionnaireForm } from '../use-questionnaire-form'
import { FilloutCurrentTab } from './fill-out-current-tab'

type FilloutMocaProps = React.PropsWithChildren<{
  sectionName: QuickNoteSectionName
  data: QuickNoteSectionItem[]
}>

const FilloutCars2St = ({ sectionName, data }: FilloutMocaProps) => {
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
            <QuestionnairesFormCars2St totalScore={totalScore} />
          </FilloutCurrentTab>
        </WidgetFormContainer>
      </Flex>
    </FormProvider>
  )
}

export { FilloutCars2St }
