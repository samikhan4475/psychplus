'use client'

import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { Flex } from '@radix-ui/themes'
import { useSearchParams } from 'next/navigation'
import { FormProvider } from 'react-hook-form'
import { QuestionnaireTabs } from '../constants'
import {
  HistoryButton,
  QuestionnairesForm,
  SaveButton,
  useQuestionnaireForm,
} from '../shared'
import { CLASSNAME_HEADER_CELL } from '../shared/constants'
import { transformIn, transformOut } from '../shared/data'
import { SubscalesConfig } from '../shared/score-interpretation-desired'
import { LABELS, QUESTIONS, SUBSCALES } from './constants'

const CopsRTab = ({
  patientId,
  data,
}: {
  patientId: string
  data: QuickNoteSectionItem[]
}) => {
  const appointmentId = useSearchParams().get('id') as string
  const totalQuestions = QUESTIONS.length
  const initialValue = transformIn(
    data,
    totalQuestions,
    QuickNoteSectionName.QuickNoteSectionCopsR,
  )
  const { totalScore, ...form } = useQuestionnaireForm(
    initialValue,
    totalQuestions,
  )

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap="0.5rem">
        <WidgetFormContainer
          patientId={patientId}
          tags={[QuickNoteSectionName.QuickNoteSectionCopsR]}
          widgetId={QuickNoteSectionName.QuickNoteSectionCopsR}
          getData={transformOut(
            patientId,
            QuickNoteSectionName.QuickNoteSectionCopsR,
            appointmentId,
          )}
          title={QuestionnaireTabs.COPS_R_TAB}
          headerRight={
            <Flex gap="2">
              <HistoryButton
                questionnaire={QuickNoteSectionName.QuickNoteSectionCopsR}
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
        >
          <QuestionnairesForm
            data={QUESTIONS}
            labels={LABELS}
            totalScore={totalScore}
            scoreInterpretationRanges={[]}
            classNameHeaderCell={`${CLASSNAME_HEADER_CELL} !bg-pp-focus-bg`}
            pagination={{
              enabled: true,
              itemsPerPage: 50,
              interpretation: SUBSCALES as SubscalesConfig,
            }}
          />
        </Flex>
      </Flex>
    </FormProvider>
  )
}

export { CopsRTab }
