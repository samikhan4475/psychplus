import React from 'react'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { FilloutCurrentTab } from '../../shared'
import { MOCA_LABELS } from '../constants'
import { QuestionnairesFormMoca } from '../form-moca/aims-form'
import { transformIn, transformOut } from '../form-moca/data'
import { useQuestionnaireFormMoca } from '../form-moca/use-moca-form'

type FilloutCurrentView = React.PropsWithChildren<{
  patientId: string
  data: QuickNoteSectionItem[]
}>

const CurrentView = ({ patientId, data }: FilloutCurrentView) => {
  const initialValue = transformIn(data)
  const { totalScore, totalFilledQuestions, ...form } =
    useQuestionnaireFormMoca(initialValue)

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          title=""
          enableEvents={false}
          patientId={patientId}
          widgetId="moca popup"
          getData={transformOut(patientId)}
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

export { CurrentView }
