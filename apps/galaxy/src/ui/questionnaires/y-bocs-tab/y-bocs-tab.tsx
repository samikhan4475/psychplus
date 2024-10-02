'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
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
  ScoreInterpretation,
  SendToPatientButton,
  useQuestionnaireForm,
} from '../shared'
import { transformIn, transformOut } from '../shared/data'
import { SCORE_INTERPRETATION_RANGES, YBOCS_TABLES } from './constants'
import { QuestionnairesFormYBocsDataTable } from './y-bocs-data-table'

interface QuestionnairesFormYBocsProps {
  patientId: string
  data: QuickNoteSectionItem[]
}

const YBocsTab = ({ patientId, data }: QuestionnairesFormYBocsProps) => {
  const totalQuestions = YBOCS_TABLES.length
  const initialValue = transformIn(data, totalQuestions)
  const { totalScore, ...form } = useQuestionnaireForm(
    initialValue,
    totalQuestions,
  )

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          enableEvents={false}
          patientId={patientId}
          widgetId={QuestionnaireTabs.Y_BOCS_TAB}
          getData={transformOut(
            patientId,
            QuickNoteSectionName.QuickNoteSectionYbcos,
          )}
          title={QuestionnaireTabs.Y_BOCS_TAB}
          headerRight={
            <Flex gap="2">
              <SendToPatientButton />
              <HistoryButton />
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
        <Flex maxWidth="100%" className="bg-white" p="3">
          <Flex className="flex-col">
            <Text weight="medium" size="2" className="pb-4">
              How often have you been bothered by any of the following problems?
            </Text>
            {YBOCS_TABLES.map((table) => {
              const { id } = table
              return <QuestionnairesFormYBocsDataTable key={id} {...table} />
            })}

            <Box mt="2">
              <ScoreInterpretation
                ranges={SCORE_INTERPRETATION_RANGES}
                totalScore={totalScore}
              />
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </FormProvider>
  )
}

export { YBocsTab }
