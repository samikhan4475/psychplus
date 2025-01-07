import React from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { MOCA_LABELS } from '@/ui/questionnaires/moca-tab/constants'
import { QuestionnairesFormMoca } from '@/ui/questionnaires/moca-tab/form-moca/aims-form'
import {
  transformIn,
  transformOut,
} from '@/ui/questionnaires/moca-tab/form-moca/data'
import { useQuestionnaireFormMoca } from '@/ui/questionnaires/moca-tab/form-moca/use-moca-form'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { FilloutCurrentTab } from '../../shared'

type FilloutMocaProps = React.PropsWithChildren<{
  sectionName: QuickNoteSectionName
  data: QuickNoteSectionItem[]
}>

const FilloutMoca = ({ sectionName, data }: FilloutMocaProps) => {
  const initialValue = transformIn(data)
  const { totalScore, totalFilledQuestions, ...form } =
    useQuestionnaireFormMoca(initialValue)
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
            <QuestionnairesFormMoca
              labels={MOCA_LABELS}
              totalScore={totalScore}
            />
          </FilloutCurrentTab>
        </WidgetFormContainer>
      </Flex>
    </FormProvider>
  )
}

export { FilloutMoca }
