'use client'

import { useSearchParams } from 'next/navigation'
import { Box, Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QuestionnaireTabs } from '../constants'
import { HistoryButton, SaveButton, ScoreInterpretation } from '../shared'
import {
  PSC_17_LABELS,
  TOTAL_SCORE_INTERPRETATION_RANGES_ATTENTION,
} from './constants'
import {
  QuestionnairesFormPsc17,
  useQuestionnaireFormPsc17,
} from './form-psc-17'
import { transformIn, transformOut } from './form-psc-17/data'

const Psc17Tab = ({
  patientId,
  data,
}: {
  patientId: string
  data: QuickNoteSectionItem[]
}) => {
  const appointmentId = useSearchParams().get('id') as string
  const initialValue = transformIn(data)
  const { totalScore, ...form } = useQuestionnaireFormPsc17(initialValue)
  let overallScore = 0
  overallScore = totalScore['Attention']
  overallScore = overallScore + totalScore['Internalizing']
  overallScore = overallScore + totalScore['Externalizing']

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          patientId={patientId}
          widgetId={QuickNoteSectionName.QuickNoteSectionPsc17}
          getData={transformOut(patientId, appointmentId)}
          title={QuestionnaireTabs.PSC_17_TAB}
          headerRight={
            <Flex gap="2">
              <HistoryButton
                questionnaire={QuickNoteSectionName.QuickNoteSectionPsc17}
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
          <QuestionnairesFormPsc17
            labels={PSC_17_LABELS}
            totalScore={totalScore}
          />
          <Box mt="2">
            <ScoreInterpretation
              ranges={TOTAL_SCORE_INTERPRETATION_RANGES_ATTENTION}
              totalScore={overallScore}
              showScoreLabel={false}
              heading="Total Score"
            />
          </Box>
        </Flex>
      </Flex>
    </FormProvider>
  )
}

export { Psc17Tab }
