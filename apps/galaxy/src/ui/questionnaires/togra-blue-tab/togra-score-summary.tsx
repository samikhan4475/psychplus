import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { parseDate, type DateValue } from '@internationalized/date'
import { Box, Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { getPatientProfileAction } from '@/actions'
import { LoadingPlaceholder } from '@/components'
import { formatDate, getAgeFromDate } from '@/utils'
import { TograProfileChart } from './togra-profile-chart'
import { TograScoreTable } from './togra-score-table'
import { ScoreItem } from './types'
import { calculateTotalScore, getAgeGroup, getTograResult } from './utils'

interface TograScoreSummaryProps {
  data: Record<string, string>
  fillOutView?: boolean
}

const TograScoreSummary = ({ data, fillOutView }: TograScoreSummaryProps) => {
  const [patientLoading, setPatientLoading] = useState(true)
  const [scoreData, setScoreData] = useState<ScoreItem[]>([])
  const patientId = useParams().id as string
  const form = useFormContext()
  const initialData = data ?? form?.getValues()
  useEffect(() => {
    ;(async () => {
      const response = await getPatientProfileAction(patientId)
      if (response.state === 'success' && response.data.birthdate) {
        const birthdate: DateValue = parseDate(response.data.birthdate)
        const age = getAgeFromDate(birthdate)
        const ageGroup = getAgeGroup(age)
        const score = calculateTotalScore(initialData)

        const tograResult = getTograResult(ageGroup, score.correct)
        if (score) {
          setScoreData([
            { name: 'Raw Score', value: `${score.correct}` },
            {
              name: 'GRI Standard Score',
              value: `${tograResult?.standardScore || 0}`,
            },
            {
              name: 'Confidence interval 90%',
              value: Array.isArray(tograResult?.confidenceInterval)
                ? tograResult.confidenceInterval.join(' - ')
                : `${tograResult?.confidenceInterval || 0}`,
            },
            {
              name: 'Test time',
              value: `${initialData.TograBlueCompletedDuration} minutes`,
            },
          ])
        }
      }
      setPatientLoading(false)
    })()
  }, [patientId, initialData])

  if (patientLoading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <>
      <Flex
        maxWidth="100%"
        className="bg-white"
        px="3"
        py="1"
        direction="column"
      >
        {!fillOutView && (
          <Box className="py-2">
            <Text>
              This questionnaire was completed on{' '}
              {data.TograBlueSubmittedDate &&
                formatDate(data.TograBlueSubmittedDate)}
            </Text>
          </Box>
        )}
      </Flex>
      <Flex
        maxWidth="100%"
        className="bg-white"
        px="3"
        py="1"
        direction="column"
      >
        <Box className="py-2">
          <Flex direction="column">
            <Box className="mb-2">
              <Text weight="bold">TOGRA Score Summary</Text>
            </Box>

            <Box>
              <TograScoreTable data={scoreData} />
            </Box>
          </Flex>
        </Box>
      </Flex>
      <Flex
        maxWidth="100%"
        className="bg-white"
        px="3"
        py="1"
        direction="column"
      >
        <Box>
          <Box className="w-full max-w-4xl space-y-6">
            <Box>
              <TograProfileChart
                rawScore={parseInt(
                  scoreData.find((item) => item.name === 'Raw Score')?.value ||
                    '0',
                )}
                griScore={parseInt(
                  scoreData.find((item) => item.name === 'GRI Standard Score')
                    ?.value || '0',
                )}
              />
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  )
}

export { TograScoreSummary }
