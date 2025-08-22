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
import { CLASSNAME_CELL, CLASSNAME_HEADER_CELL } from '../shared/constants'
import { transformIn, transformOut } from '../shared/data'
import { LABELS, QUESTIONS, TOTAL_QUESTIONS } from './constants'
import { QuestionnairesFormMdqDataTable } from './mdq-data-table'

const MdqTab = ({
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
    QuickNoteSectionName.QuickNoteSectionMdq,
  )
  const { totalScore, ...form } = useQuestionnaireForm(
    initialValue,
    TOTAL_QUESTIONS,
  )

  if (!data) {
    return <ViewLoadingPlaceholder title={QuestionnaireTabs.MDQ_TAB} />
  }

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          patientId={patientId}
          tags={[QuickNoteSectionName.QuickNoteSectionMdq]}
          widgetId={QuickNoteSectionName.QuickNoteSectionMdq}
          getData={transformOut(
            patientId,
            QuickNoteSectionName.QuickNoteSectionMdq,
            appointmentId,
          )}
          title={QuestionnaireTabs.MDQ_TAB}
          headerRight={
            <Flex gap="2">
              <HistoryButton
                questionnaire={QuickNoteSectionName.QuickNoteSectionMdq}
              />
              <SaveButton />
            </Flex>
          }
        />
        <Flex
          maxWidth="100%"
          className="bg-white"
          px="3"
          py="1"
          direction="column"
          gap="2"
        >
          <QuestionnairesForm
            data={QUESTIONS}
            labels={LABELS}
            totalScore={totalScore}
            scoreInterpretationRanges={[]}
            classNameHeaderCell={CLASSNAME_HEADER_CELL}
            classNameCell={CLASSNAME_CELL}
          />
          <QuestionnairesFormMdqDataTable
            isWidthFifty={true}
            label="Follow-up Questions"
            totalScore={totalScore}
            Q14={form.watch('Q14')}
            Q15={form.watch('Q15')}
          />
        </Flex>
      </Flex>
    </FormProvider>
  )
}

export { MdqTab }
