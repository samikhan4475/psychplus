import React from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { AIMS_LABELS } from '@/ui/questionnaires/aims-tab/constants'
import { QuestionnairesFormAims } from '@/ui/questionnaires/aims-tab/form-aims/aims-form'
import {
  transformIn,
  transformOut,
} from '@/ui/questionnaires/aims-tab/form-aims/data'
import { useQuestionnaireFormAims } from '@/ui/questionnaires/aims-tab/form-aims/use-aims-form'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { FilloutCurrentTab } from '..'

type FilloutAimsProps = React.PropsWithChildren<{
  sectionName: QuickNoteSectionName
  data: QuickNoteSectionItem[]
}>

const FilloutAims = ({ sectionName, data }: FilloutAimsProps) => {
  const appointmentId = useSearchParams().get('id') as string
  const initialValue = transformIn(data)
  const { totalScore, totalFilledQuestions, ...form } =
    useQuestionnaireFormAims(initialValue)
  const patientId = useParams().id as string

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          patientId={patientId}
          tags={[sectionName]}
          widgetId={sectionName}
          getData={transformOut(patientId, appointmentId)}
        >
          <FilloutCurrentTab
            max={Object.keys(initialValue).length}
            value={totalFilledQuestions}
            widgetId={sectionName}
          >
            <QuestionnairesFormAims
              labels={AIMS_LABELS}
              totalScore={totalScore}
            />
          </FilloutCurrentTab>
        </WidgetFormContainer>
      </Flex>
    </FormProvider>
  )
}

export { FilloutAims }
