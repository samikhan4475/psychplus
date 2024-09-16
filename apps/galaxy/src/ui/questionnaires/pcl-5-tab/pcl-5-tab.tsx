'use client'

import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { TabContentHeading, ViewLoadingPlaceholder } from '@/components'
import { PCL_5_TAB } from '../constants'
import {
  AddToNoteCell,
  AddToPreVisitAssessmentCell,
  HistoryButton,
  SaveButton,
  SendToPatientButton,
} from '../shared'
import {
  QuestionnairesData,
  QuestionnairesForm,
} from '../shared/questionnaires-form'
import { useQuestionnaireForm } from '../shared/use-questionnaire-form'
import { LABELS, SCORE_INTERPRETATION_RANGES } from './constants'

const Pcl5Tab = ({
  questionnairesPcl5Data,
}: {
  questionnairesPcl5Data: QuestionnairesData[]
}) => {
  const { totalScore, ...formMethods } = useQuestionnaireForm(
    questionnairesPcl5Data,
  )

  if (!questionnairesPcl5Data) {
    return <ViewLoadingPlaceholder title={PCL_5_TAB} />
  }

  return (
    <FormProvider {...formMethods}>
      <TabContentHeading title={PCL_5_TAB}>
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
          data={questionnairesPcl5Data}
          labels={LABELS}
          totalScore={totalScore}
          scoreInterpretationRanges={SCORE_INTERPRETATION_RANGES}
        />
      </Flex>
    </FormProvider>
  )
}

export { Pcl5Tab }
