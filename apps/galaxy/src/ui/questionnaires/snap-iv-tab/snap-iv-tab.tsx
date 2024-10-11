'use client'

import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuestionnaireTabs } from '../constants'
import {
  AddToNoteCell,
  AddToPreVisitAssessmentCell,
  HistoryButton,
  SaveButton,
  SendToPatientButton,
} from '../shared'
import { SNAP_IV_LABELS } from './constants'
import { FillOutButtonSnapIv } from './fill-out-button'
import {
  QuestionnairesFormSnapIv,
  useQuestionnaireFormSnapIv,
} from './form-snap-iv'
import { transformIn, transformOut } from './form-snap-iv/data'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

const SnapIvTab = ({
  patientId,
  data,
}: {
  patientId: string
  data: QuickNoteSectionItem[]
}) => {
  const initialValue = transformIn(data)
  const { totalScore, ...form } = useQuestionnaireFormSnapIv(initialValue)

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          enableEvents={false}
          patientId={patientId}
          widgetId={QuestionnaireTabs.SNAP_IV_TAB}
          getData={transformOut(patientId)}
          title={QuestionnaireTabs.SNAP_IV_TAB}
          headerRight={
            <Flex gap="2">
              <FillOutButtonSnapIv patientId={patientId} data={data} />
              <SendToPatientButton />
              <HistoryButton
                sectionName={QuickNoteSectionName.QuickNoteSectionSnapIV}
                questionnaire={QuestionnaireTabs.SNAP_IV_TAB}
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
          <QuestionnairesFormSnapIv
            labels={SNAP_IV_LABELS}
            totalScore={totalScore}
          />
        </Flex>
      </Flex>
    </FormProvider>
  )
}

export { SnapIvTab }
