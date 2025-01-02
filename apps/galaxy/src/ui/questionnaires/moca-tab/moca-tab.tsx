'use client'

import { useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QuestionnaireTabs } from '../constants'
import { HistoryButton, SaveButton } from '../shared'
import { MOCA_LABELS } from './constants'
import { QuestionnairesFormMoca } from './form-moca/aims-form'
import { transformIn, transformOut } from './form-moca/data'
import { useQuestionnaireFormMoca } from './form-moca/use-moca-form'

const MocaTab = ({
  patientId,
  data,
}: {
  patientId: string
  data: QuickNoteSectionItem[]
}) => {
  const initialValue = transformIn(data)
  const { totalScore, ...form } = useQuestionnaireFormMoca(initialValue)
  const appointmentId = useSearchParams().get('id') as string

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          patientId={patientId}
          tags={[QuickNoteSectionName.QuickNoteSectionMoca]}
          widgetId={QuickNoteSectionName.QuickNoteSectionMoca}
          getData={transformOut(patientId, appointmentId)}
          title={QuestionnaireTabs.MOCA_TAB}
          headerRight={
            <Flex gap="2">
              <HistoryButton
                questionnaire={QuickNoteSectionName.QuickNoteSectionMoca}
              />
              <SaveButton />
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
