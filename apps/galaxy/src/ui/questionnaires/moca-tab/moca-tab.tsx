'use client'

import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuestionnaireTabs } from '../constants'
import { AddToNoteCell, HistoryButton, SaveButton } from '../shared'
import { MOCA_LABELS } from './constants'
import { QuestionnairesFormMoca } from './form-moca/aims-form'
import { transformIn, transformOut } from './form-moca/data'
import { useQuestionnaireFormMoca } from './form-moca/use-moca-form'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

const MocaTab = ({
  patientId,
  data,
}: {
  patientId: string
  data: QuickNoteSectionItem[]
}) => {
  const initialValue = transformIn(data)
  const { totalScore, ...form } = useQuestionnaireFormMoca(initialValue)

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          patientId={patientId}
          widgetId={QuestionnaireTabs.MOCA_TAB}
          getData={transformOut(patientId)}
          title={QuestionnaireTabs.MOCA_TAB}
          headerRight={
            <Flex gap="2">
              <HistoryButton questionnaire={QuickNoteSectionName.QuickNoteSectionMoca} />
              <SaveButton />
            </Flex>
          }
          headerLeft={
            <Flex>
              <AddToNoteCell />
            </Flex>
          }
        />
        <Flex maxWidth="100%" className="bg-white" px="3" py="1">
          <QuestionnairesFormMoca
            labels={MOCA_LABELS}
            totalScore={totalScore}
          />
        </Flex>
      </Flex>
    </FormProvider>
  )
}

export { MocaTab }
