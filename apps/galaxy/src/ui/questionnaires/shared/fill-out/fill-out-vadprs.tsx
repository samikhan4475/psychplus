import React, { useMemo } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import {
  transformIn,
  transformOut,
} from '@/ui/questionnaires/vadprs-tab/form-vadprs/data'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { FilloutCurrentTab } from '..'
import { useQuestionnaireFormVadprs } from '../../vadprs-tab/form-vadprs/use-vadprs-form'
import QuestionnairesFormVadprsTable from '../../vadprs-tab/form-vadprs/vadprs-table'

type FilloutAimsProps = React.PropsWithChildren<{
  sectionName: QuickNoteSectionName
  data: QuickNoteSectionItem[]
}>

const FilloutVadprs = ({ sectionName, data }: FilloutAimsProps) => {
  const appointmentId = useSearchParams().get('id') as string
  const initialValue = useMemo(() => transformIn(data), [data])
  const { totalFilledQuestions, ...form } =
    useQuestionnaireFormVadprs(initialValue)
  const { id: patientId } = useParams<{id: string}>()
  
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
            <Flex direction="column" gap=".5rem">
              <QuestionnairesFormVadprsTable />
            </Flex>
          </FilloutCurrentTab>
        </WidgetFormContainer>
      </Flex>
    </FormProvider>
  )
}

export { FilloutVadprs }
