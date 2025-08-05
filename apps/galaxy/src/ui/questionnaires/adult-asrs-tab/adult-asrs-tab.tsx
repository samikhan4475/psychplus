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
  Adult_ASRS_LABELS,
  TOTAL_SCORE_INTERPRETATION_RANGES_PARTS,
} from './constants'
import {
  QuestionnairesFormAdultAsrs,
  useQuestionnairesFormAdultAsrs,
} from './form-adult-asrs'
import { transformIn, transformOut } from './form-adult-asrs/data'

const AdultAsrsTab = ({
  patientId,
  data,
}: {
  patientId: string
  data: QuickNoteSectionItem[]
}) => {
  const appointmentId = useSearchParams().get('id') as string
  const initialValue = transformIn(data)
  const { totalScore, ...form } = useQuestionnairesFormAdultAsrs(initialValue)
  let overallScore = 0
  overallScore = totalScore['PartA']
  overallScore = overallScore + totalScore['PartB']

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          patientId={patientId}
          widgetId={QuickNoteSectionName.QuickNoteSectionAdultAsrs}
          getData={transformOut(patientId, appointmentId)}
          title={QuestionnaireTabs.ADULT_ASRS_TAB}
          headerRight={
            <Flex gap="2">
              <HistoryButton
                questionnaire={QuickNoteSectionName.QuickNoteSectionAdultAsrs}
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
          <QuestionnairesFormAdultAsrs
            labels={Adult_ASRS_LABELS}
            totalScore={totalScore}
          />
          <Box mt="2">
            <ScoreInterpretation
              ranges={TOTAL_SCORE_INTERPRETATION_RANGES_PARTS}
              totalScore={overallScore}
              showScoreLabel={false}
              heading="Total Score"
              subHeading="Score 40 or above are considered clinically significant."
            />
          </Box>
        </Flex>
      </Flex>
    </FormProvider>
  )
}

export { AdultAsrsTab }
