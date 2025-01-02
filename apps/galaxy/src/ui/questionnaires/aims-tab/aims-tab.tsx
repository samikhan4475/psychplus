'use client'

import { useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QuestionnaireTabs } from '../constants'
import { HistoryButton, SaveButton } from '../shared'
import { AIMS_LABELS } from './constants'
import { QuestionnairesFormAims } from './form-aims/aims-form'
import { transformIn, transformOut } from './form-aims/data'
import { useQuestionnaireFormAims } from './form-aims/use-aims-form'

const AimsTab = ({
  patientId,
  data,
}: {
  patientId: string
  data: QuickNoteSectionItem[]
}) => {
  const appointmentId = useSearchParams().get('id') as string
  const initialValue = transformIn(data)
  const { totalScore, ...form } = useQuestionnaireFormAims(initialValue)

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          patientId={patientId}
          tags={[QuickNoteSectionName.QuickNoteSectionAims]}
          widgetId={QuickNoteSectionName.QuickNoteSectionAims}
          getData={transformOut(patientId, appointmentId)}
          title={QuestionnaireTabs.AIMS_TAB}
          headerRight={
            <Flex gap="2">
              <HistoryButton
                questionnaire={QuickNoteSectionName.QuickNoteSectionAims}
              />
              <SaveButton />
            </Flex>
          }
        />
        <Flex maxWidth="100%" className="bg-white" px="3" py="1">
          <QuestionnairesFormAims
            labels={AIMS_LABELS}
            totalScore={totalScore}
          />
        </Flex>
      </Flex>
    </FormProvider>
  )
}

export { AimsTab }
