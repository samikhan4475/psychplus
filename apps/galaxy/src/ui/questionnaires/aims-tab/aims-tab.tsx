'use client'

import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QuestionnaireTabs } from '../constants'
import {
  AddToNoteCell,
  AddToPreVisitAssessmentCell,
  HistoryButton,
  SaveButton,
  SendToPatientButton,
} from '../shared'
import { AIMS_LABELS } from './constants'
import { FillOutButtonAims } from './fill-out-button'
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
  const initialValue = transformIn(data)
  const { totalScore, ...form } = useQuestionnaireFormAims(initialValue)

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          enableEvents={false}
          patientId={patientId}
          widgetId={QuestionnaireTabs.AIMS_TAB}
          getData={transformOut(patientId)}
          title={QuestionnaireTabs.AIMS_TAB}
          headerRight={
            <Flex gap="2">
              <FillOutButtonAims patientId={patientId} data={[]} />
              <SendToPatientButton />
              <HistoryButton
                sectionName={QuickNoteSectionName.QuickNoteSectionAims}
                questionnaire={QuestionnaireTabs.AIMS_TAB}
                patientId={patientId}
              />
              <SaveButton />
            </Flex>
          }
          headerLeft={
            <Flex>
              <AddToPreVisitAssessmentCell />
              <AddToNoteCell />
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
