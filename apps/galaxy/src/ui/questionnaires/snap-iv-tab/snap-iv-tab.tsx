'use client'

import { useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QuestionnaireTabs } from '../constants'
import { HistoryButton, SaveButton } from '../shared'
import { SNAP_IV_LABELS } from './constants'
import {
  QuestionnairesFormSnapIv,
  useQuestionnaireFormSnapIv,
} from './form-snap-iv'
import { transformIn, transformOut } from './form-snap-iv/data'

const SnapIvTab = ({
  patientId,
  data,
}: {
  patientId: string
  data: QuickNoteSectionItem[]
}) => {
  const appointmentId = useSearchParams().get('id') as string
  const initialValue = transformIn(data)
  const { totalScore, ...form } = useQuestionnaireFormSnapIv(initialValue)

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          patientId={patientId}
          widgetId={QuickNoteSectionName.QuickNoteSectionSnapIV}
          getData={transformOut(patientId, appointmentId)}
          title={QuestionnaireTabs.SNAP_IV_TAB}
          headerRight={
            <Flex gap="2">
              <HistoryButton
                questionnaire={QuickNoteSectionName.QuickNoteSectionSnapIV}
              />
              <SaveButton />
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
