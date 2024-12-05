import React from 'react'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { FilloutCurrentTab } from '../../shared'
import { AIMS_LABELS } from '../constants'
import { QuestionnairesFormAims } from '../form-aims/aims-form'
import { transformIn, transformOut } from '../form-aims/data'
import { useQuestionnaireFormAims } from '../form-aims/use-aims-form'

type FilloutCurrentView = React.PropsWithChildren<{
  patientId: string
  data: QuickNoteSectionItem[]
}>

const CurrentView = ({ patientId, data }: FilloutCurrentView) => {
  const initialValue = transformIn(data)
  const { totalScore, totalFilledQuestions, ...form } =
    useQuestionnaireFormAims(initialValue)

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          title=""
          patientId={patientId}
          widgetId="snap-iv popup"
          getData={transformOut(patientId)}
        >
          <FilloutCurrentTab
            max={Object.keys(initialValue).length}
            value={totalFilledQuestions}
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

export { CurrentView }
