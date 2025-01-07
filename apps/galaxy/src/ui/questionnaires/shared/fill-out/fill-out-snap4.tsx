import React from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { SNAP_IV_LABELS } from '@/ui/questionnaires/snap-iv-tab/constants'
import {
  QuestionnairesFormSnapIv,
  useQuestionnaireFormSnapIv,
} from '@/ui/questionnaires/snap-iv-tab/form-snap-iv'
import {
  transformIn,
  transformOut,
} from '@/ui/questionnaires/snap-iv-tab/form-snap-iv/data'
import { FilloutCurrentTab } from '../../shared'

type FilloutSnap4Props = React.PropsWithChildren<{
  sectionName: string
  data: QuickNoteSectionItem[]
}>

const FilloutSnap4 = ({ sectionName, data }: FilloutSnap4Props) => {
  const initialValue = transformIn(data)
  const { totalScore, totalFilledQuestions, ...form } =
    useQuestionnaireFormSnapIv(initialValue)

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

export { FilloutSnap4 }
