import React from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import {
  transformIn,
  transformOut,
} from '@/ui/questionnaires/adult-asrs-tab/form-adult-asrs/data'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { FilloutCurrentTab } from '..'
import { QuestionnairesFormAdultAsrs, useQuestionnairesFormAdultAsrs } from '../../adult-asrs-tab/form-adult-asrs'
import { Adult_ASRS_LABELS } from '../../adult-asrs-tab/constants'

type FilloutAdultAsrsProps = React.PropsWithChildren<{
  sectionName: string
  data: QuickNoteSectionItem[]
}>

const FilloutAdultAsrs = ({ sectionName, data }: FilloutAdultAsrsProps) => {
  const initialValue = transformIn(data)
  const { totalScore, totalFilledQuestions, ...form } =
    useQuestionnairesFormAdultAsrs(initialValue)

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
            <QuestionnairesFormAdultAsrs
              labels={Adult_ASRS_LABELS}
              totalScore={totalScore}
            />
          </FilloutCurrentTab>
        </WidgetFormContainer>
      </Flex>
    </FormProvider>
  )
}

export { FilloutAdultAsrs }
