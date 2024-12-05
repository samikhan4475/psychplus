import React from 'react'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { FilloutCurrentTab } from '../../shared'
import { SNAP_IV_LABELS } from '../constants'
import {
  QuestionnairesFormSnapIv,
  useQuestionnaireFormSnapIv,
} from '../form-snap-iv'
import { transformIn, transformOut } from '../form-snap-iv/data'

type FilloutCurrentView = React.PropsWithChildren<{
  patientId: string
  data: QuickNoteSectionItem[]
}>

const CurrentView = ({ patientId, data }: FilloutCurrentView) => {
  const initialValue = transformIn(data)
  const { totalScore, totalFilledQuestions, ...form } =
    useQuestionnaireFormSnapIv(initialValue)

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
            <QuestionnairesFormSnapIv
              labels={SNAP_IV_LABELS}
              totalScore={totalScore}
            />
          </FilloutCurrentTab>
        </WidgetFormContainer>
      </Flex>
    </FormProvider>
  )
}

export { CurrentView }
