'use client'

import { useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QuestionnaireTabs } from '../constants'
import { HistoryButton, SaveButton, useQuestionnaireForm } from '../shared'
import { transformIn, transformOut } from '../shared/data'
import { TOTAL_QUESTIONS } from './constants'
import { QuestionnairesFormGqAsc } from './gq-asc-form'

const GqAscTab = ({
  patientId,
  data,
}: {
  patientId: string
  data: QuickNoteSectionItem[]
}) => {
  const appointmentId = useSearchParams().get('id') as string
  const initialValue = transformIn(
    data,
    TOTAL_QUESTIONS,
    QuickNoteSectionName.QuickNoteSectionGqasc,
    1,
  )
  const { totalScore, ...form } = useQuestionnaireForm(
    initialValue,
    TOTAL_QUESTIONS,
  )

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          patientId={patientId}
          tags={[QuickNoteSectionName.QuickNoteSectionGqasc]}
          widgetId={QuickNoteSectionName.QuickNoteSectionGqasc}
          getData={transformOut(
            patientId,
            QuickNoteSectionName.QuickNoteSectionGqasc,
            appointmentId,
          )}
          title={QuestionnaireTabs.GQ_ASC_TAB}
          headerRight={
            <Flex gap="2">
              <HistoryButton
                questionnaire={QuickNoteSectionName.QuickNoteSectionGqasc}
              />
              <SaveButton />
            </Flex>
          }
        />
        <QuestionnairesFormGqAsc totalScore={totalScore} />
      </Flex>
    </FormProvider>
  )
}

export { GqAscTab }
