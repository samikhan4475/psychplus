'use client'

import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { TabContentHeading, ViewLoadingPlaceholder } from '@/components'
import { PHQ_9_TAB } from '../constants'
import { LABELS, SCORE_INTERPRETATION_RANGES } from '../gad-7-tab/constants'
import {
  AddToNoteCell,
  AddToPreVisitAssessmentCell,
  HistoryButton,
  QuestionnairesData,
  QuestionnairesForm,
  SaveButton,
  SendToPatientButton,
  useQuestionnaireForm,
} from '../shared'

const Phq9Tab = ({
  questionnairesPhq9Data,
}: {
  questionnairesPhq9Data: QuestionnairesData[]
}) => {
  const { totalScore, ...formMethods } = useQuestionnaireForm(
    questionnairesPhq9Data,
  )

  if (!questionnairesPhq9Data) {
    return <ViewLoadingPlaceholder title={PHQ_9_TAB} />
  }

  return (
    <FormProvider {...formMethods}>
      <TabContentHeading title={PHQ_9_TAB}>
        <Flex ml="2">
          <AddToPreVisitAssessmentCell />
          <AddToNoteCell />
        </Flex>

        <Flex align="center" justify="end" gap="2" className="flex-1">
          <SendToPatientButton />
          <HistoryButton />
          <SaveButton />
        </Flex>
      </TabContentHeading>

      <Flex className="bg-white" p="4">
        <QuestionnairesForm
          data={questionnairesPhq9Data}
          labels={LABELS}
          totalScore={totalScore}
          scoreInterpretationRanges={SCORE_INTERPRETATION_RANGES}
        />
      </Flex>
    </FormProvider>
  )
}

export { Phq9Tab }
