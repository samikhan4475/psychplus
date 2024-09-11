'use client'

import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { TabContentHeading, ViewLoadingPlaceholder } from '@/components'
import { GAD_7_TAB } from '../constants'
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
import { LABELS, SCORE_INTERPRETATION_RANGES } from './constants'

const Gad7Tab = ({
  questionnairesGad7Data,
}: {
  questionnairesGad7Data: QuestionnairesData[]
}) => {
  const { totalScore, ...formMethods } = useQuestionnaireForm(
    questionnairesGad7Data,
  )

  if (!questionnairesGad7Data) {
    return <ViewLoadingPlaceholder title={GAD_7_TAB} />
  }

  return (
    <FormProvider {...formMethods}>
      <TabContentHeading title={GAD_7_TAB}>
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
          data={questionnairesGad7Data}
          labels={LABELS}
          totalScore={totalScore}
          scoreInterpretationRanges={SCORE_INTERPRETATION_RANGES}
        />
      </Flex>
    </FormProvider>
  )
}

export { Gad7Tab }
