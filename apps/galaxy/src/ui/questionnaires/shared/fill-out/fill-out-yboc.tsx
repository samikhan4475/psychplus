import { useParams, useSearchParams } from 'next/navigation'
import { Box, Flex, Text } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import {
  SCORE_INTERPRETATION_RANGES,
  YBOCS_TABLES,
} from '@/ui/questionnaires/y-bocs-tab/constants'
import { QuestionnairesFormYBocsDataTable } from '@/ui/questionnaires/y-bocs-tab/y-bocs-data-table'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import {
  FilloutCurrentTab,
  ScoreInterpretation,
  useQuestionnaireForm,
} from '../../shared'
import { transformIn, transformOut } from '../../shared/data'

type FillOutButtonYBocsProps = React.PropsWithChildren<{
  sectionName: string
  data: QuickNoteSectionItem[]
}>

const FilloutYboc = ({ data, sectionName }: FillOutButtonYBocsProps) => {
  const totalQuestions = YBOCS_TABLES.length
  const initialValue = transformIn(data, totalQuestions)
  const { totalScore, totalFilledQuestions, ...form } = useQuestionnaireForm(
    initialValue,
    totalQuestions,
  )
  const appointmentId = useSearchParams().get('id') as string
  const patientId = useParams().id as string

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          title=""
          patientId={patientId}
          tags={[sectionName]}
          widgetId={sectionName}
          getData={transformOut(
            patientId,
            sectionName as QuickNoteSectionName,
            appointmentId,
          )}
        >
          <FilloutCurrentTab
            max={Object.keys(initialValue).length}
            value={totalFilledQuestions}
          >
            <Flex maxWidth="100%" className="bg-white" p="3">
              <Flex className="flex-col">
                <Text weight="medium" size="2" className="pb-4">
                  How often have you been bothered by any of the following
                  problems?
                </Text>
                {YBOCS_TABLES.map((table) => {
                  const { id } = table
                  return (
                    <QuestionnairesFormYBocsDataTable key={id} {...table} />
                  )
                })}

                <Box mt="2">
                  <ScoreInterpretation
                    ranges={SCORE_INTERPRETATION_RANGES}
                    totalScore={totalScore}
                  />
                </Box>
              </Flex>
            </Flex>
          </FilloutCurrentTab>
        </WidgetFormContainer>
      </Flex>
    </FormProvider>
  )
}

export { FilloutYboc }
