'use client'

import { useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QuestionnaireTabs } from '../constants'
import { HistoryButton, SaveButton } from '../shared'
import { transformIn, transformOut } from './form-vadprs/data'
import { useQuestionnaireFormVadprs } from './form-vadprs/use-vadprs-form'
import QuestionnairesFormVadprsTable from './form-vadprs/vadprs-table'
import { VADPRS_CHILD_EVALUATION } from './constants'

const VadprsTab = ({
  patientId,
  data,
}: {
  patientId: string
  data: QuickNoteSectionItem[]
}) => {
  const appointmentId = useSearchParams().get('id') as string
  const initialValue = transformIn(data)
  const { ...form } = useQuestionnaireFormVadprs(initialValue)

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap="0.5rem">
        <WidgetFormContainer
          patientId={patientId}
          tags={[QuickNoteSectionName.QuickNoteSectionVadprs]}
          widgetId={QuickNoteSectionName.QuickNoteSectionVadprs}
          getData={transformOut(patientId, appointmentId)}
          title={QuestionnaireTabs.VADPRS_TAB}
          headerRight={
            <Flex gap="2">
              <HistoryButton
                questionnaire={QuickNoteSectionName.QuickNoteSectionVadprs}
              />
              <SaveButton disabled={!form.watch(VADPRS_CHILD_EVALUATION)} />
            </Flex>
          }
        />
        <QuestionnairesFormVadprsTable />
      </Flex>
    </FormProvider>
  )
}

export { VadprsTab }
