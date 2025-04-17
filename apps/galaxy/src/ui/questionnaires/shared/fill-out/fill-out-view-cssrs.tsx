import React from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { CSSRS_LABELS } from '@/ui/questionnaires/c-ssrs-tab/constants'
import { QuestionnairesFormCssrs } from '@/ui/questionnaires/c-ssrs-tab/form-c-ssrs/c-ssrs-form'
import {
  transformIn,
  transformOut,
} from '@/ui/questionnaires/c-ssrs-tab/form-c-ssrs/data'
import { useQuestionnaireFormCssrs } from '@/ui/questionnaires/c-ssrs-tab/form-c-ssrs/use-c-ssrs-form'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { FilloutCurrentTab } from '..'

type FilloutCssrsProps = React.PropsWithChildren<{
  sectionName: QuickNoteSectionName
  data: QuickNoteSectionItem[]
}>

const FilloutCssrs = ({ sectionName, data }: FilloutCssrsProps) => {
  const initialValue = transformIn(data)
  const { totalScore, totalFilledQuestions, ...form } =
    useQuestionnaireFormCssrs(initialValue)
  const appointmentId = useSearchParams().get('id') as string
  const patientId = useParams().id as string

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          title=""
          patientId={patientId}
          tags={[sectionName]}
          widgetId={sectionName}
          getData={transformOut(patientId, appointmentId)}
        >
          <FilloutCurrentTab
            max={Object.keys(initialValue).length}
            value={totalFilledQuestions}
          >
            <QuestionnairesFormCssrs
              labels={CSSRS_LABELS}
              totalScore={totalScore}
            />
          </FilloutCurrentTab>
        </WidgetFormContainer>
      </Flex>
    </FormProvider>
  )
}

export { FilloutCssrs }
