'use client'

import { useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QuestionnaireTabs } from '../constants'
import { HistoryButton, SaveButton } from '../shared'
import { CSSRS_LABELS } from './constants'
import {
  QuestionnairesFormCssrs,
  useQuestionnaireFormCssrs,
} from './form-c-ssrs'
import { transformIn, transformOut } from './form-c-ssrs/data'

const CssrsTab = ({
  patientId,
  data,
}: {
  patientId: string
  data: QuickNoteSectionItem[]
}) => {
  const appointmentId = useSearchParams().get('id') as string
  const initialValue = transformIn(data)
  const { totalScore, ...form } = useQuestionnaireFormCssrs(initialValue)

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          patientId={patientId}
          tags={[QuickNoteSectionName.QuickNoteSectionCssrs]}
          widgetId={QuickNoteSectionName.QuickNoteSectionCssrs}
          getData={transformOut(patientId, appointmentId)}
          title={QuestionnaireTabs.C_SSRS_TAB}
          headerRight={
            <Flex gap="2">
              <HistoryButton
                questionnaire={QuickNoteSectionName.QuickNoteSectionCssrs}
              />
              <SaveButton />
            </Flex>
          }
        />
        <Flex maxWidth="100%" className="bg-white" px="3" py="1">
          <QuestionnairesFormCssrs
            labels={CSSRS_LABELS}
            totalScore={totalScore}
          />
        </Flex>
      </Flex>
    </FormProvider>
  )
}

export { CssrsTab }
