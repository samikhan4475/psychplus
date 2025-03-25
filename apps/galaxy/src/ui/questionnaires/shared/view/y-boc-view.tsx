'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { QuickNoteSectionItem } from '@/types'
import {
  SCORE_INTERPRETATION_RANGES,
  YBOCS_TABLES,
} from '../../y-bocs-tab/constants'
import { transformIn } from '../../y-bocs-tab/data'
import { QuestionnairesFormYBocsDataTable } from '../../y-bocs-tab/y-bocs-data-table'
import { ScoreInterpretation } from '../score-interpretation'
import { useQuestionnaireForm } from '../use-questionnaire-form'

interface QuestionnairesFormYBocsProps {
  data: QuickNoteSectionItem[]
}

const YBocView = ({ data }: QuestionnairesFormYBocsProps) => {
  const totalQuestions = YBOCS_TABLES.length
  const initialValue = transformIn(data, totalQuestions)
  const { totalScore, ...form } = useQuestionnaireForm(
    initialValue,
    totalQuestions,
  )

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <Flex maxWidth="100%" className="bg-white" p="3">
          <Flex className="flex-col">
            <Text weight="medium" size="2" className="pb-4">
              How often have you been bothered by any of the following problems?
            </Text>
            {YBOCS_TABLES.map((table) => {
              const { id } = table
              return <QuestionnairesFormYBocsDataTable key={id} {...table} disabled />
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

export { YBocView }
