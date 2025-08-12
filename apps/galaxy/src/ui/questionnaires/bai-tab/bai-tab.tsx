'use client'

import { useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { ViewLoadingPlaceholder, WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QuestionnaireTabs } from '../constants'
import {
  HistoryButton,
  QuestionnairesForm,
  SaveButton,
  useQuestionnaireForm,
} from '../shared'
import { transformIn, transformOut } from '../shared/data'
import {
  BAI_LABELS,
  BAI_QUESTIONS,
  BAI_SCORE_INTERPRETATION_RANGES,
} from './constants'

const BaiTab = ({
  patientId,
  data,
}: {
  patientId: string
  data: QuickNoteSectionItem[]
}) => {
  const appointmentId = useSearchParams().get('id') as string
  const totalQuestions = BAI_QUESTIONS.length
  const initialValue = transformIn(
    data,
    totalQuestions,
    QuickNoteSectionName.QuickNoteSectionBai,
  )
  const { totalScore, ...form } = useQuestionnaireForm(
    initialValue,
    totalQuestions,
  )

  if (!data) {
    return <ViewLoadingPlaceholder title={QuestionnaireTabs.BAI_TAB} />
  }

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          patientId={patientId}
          tags={[QuickNoteSectionName.QuickNoteSectionBai]}
          widgetId={QuickNoteSectionName.QuickNoteSectionBai}
          getData={transformOut(
            patientId,
            QuickNoteSectionName.QuickNoteSectionBai,
            appointmentId,
          )}
          title={QuestionnaireTabs.BAI_TAB}
          headerRight={
            <Flex gap="2">
              <HistoryButton
                questionnaire={QuickNoteSectionName.QuickNoteSectionBai}
              />
              <SaveButton />
            </Flex>
          }
        />
        <Flex maxWidth="100%" className="bg-white" px="3" py="1">
          <QuestionnairesForm
            data={BAI_QUESTIONS}
            labels={BAI_LABELS}
            totalScore={totalScore}
            scoreInterpretationRanges={BAI_SCORE_INTERPRETATION_RANGES}
          />
        </Flex>
      </Flex>
    </FormProvider>
  )
}

export { BaiTab }
