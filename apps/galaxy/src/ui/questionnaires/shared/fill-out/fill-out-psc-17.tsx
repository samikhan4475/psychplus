import React from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { PSC_17_LABELS } from '@/ui/questionnaires/psc-17-tab/constants'
import {
  QuestionnairesFormPsc17,
  useQuestionnaireFormPsc17,
} from '@/ui/questionnaires/psc-17-tab/form-psc-17'
import {
  transformIn,
  transformOut,
} from '@/ui/questionnaires/psc-17-tab/form-psc-17/data'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { FilloutCurrentTab } from '..'

type FilloutPsc17Props = React.PropsWithChildren<{
  sectionName: string
  data: QuickNoteSectionItem[]
}>

const FilloutPsc17 = ({ sectionName, data }: FilloutPsc17Props) => {
  const initialValue = transformIn(data)
  const { totalScore, totalFilledQuestions, ...form } =
    useQuestionnaireFormPsc17(initialValue)

  const appointmentId = useSearchParams().get('id') as string
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
            widgetId={sectionName as QuickNoteSectionName}
          >
            <QuestionnairesFormPsc17
              labels={PSC_17_LABELS}
              totalScore={totalScore}
            />
          </FilloutCurrentTab>
        </WidgetFormContainer>
      </Flex>
    </FormProvider>
  )
}

export { FilloutPsc17 }
