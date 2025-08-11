import React from 'react'
import { Badge, Box, Flex, Text } from '@radix-ui/themes'
import { cn } from '@/utils'
import { SCORE_INTERPRETATION, VADPRS_QUESTION_IDS } from './constants'

export interface VadprsScoreData {
  vadprsQuestions: Record<string, number>
  performanceQuestions: Record<string, number>
}

interface VadprsScoreComponentProps {
  scoreData: VadprsScoreData
}

const calculateRangeScore = (
  questions: Record<string, number>,
  startQ: number,
  endQ: number,
  threshold: number = 2,
) => {
  let count = 0
  for (let i = startQ; i <= endQ; i++) {
    const questionKey =
      VADPRS_QUESTION_IDS[`Q${i}` as keyof typeof VADPRS_QUESTION_IDS]
    if (questions[questionKey] >= threshold) {
      count++
    }
  }
  return count
}

const hasPerformanceCriteria = (
  performanceQuestions: Record<string, number>,
) => {
  return Object.values(performanceQuestions).some((value) => value >= 4)
}

const calculateAveragePerformance = (
  performanceQuestions: Record<string, number>,
) => {
  const scores = Object.values(performanceQuestions).filter(
    (score) => score > 0,
  )
  return scores.length > 0
    ? (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(2)
    : '0.00'
}

const VadprsScoreComponent: React.FC<VadprsScoreComponentProps> = ({
  scoreData,
}) => {
  const { vadprsQuestions, performanceQuestions } = scoreData

  const q1to9Score = calculateRangeScore(vadprsQuestions, 1, 9, 2)
  const q10to18Score = calculateRangeScore(vadprsQuestions, 10, 18, 2)
  const totalQ1to18 = q1to9Score + q10to18Score
  const q19to26Score = calculateRangeScore(vadprsQuestions, 19, 26, 2)
  const q27to40Score = calculateRangeScore(vadprsQuestions, 27, 40, 2)
  const q41to47Score = calculateRangeScore(vadprsQuestions, 41, 47, 2)

  const averagePerformance = calculateAveragePerformance(performanceQuestions)
  const totalScore = Object.values(vadprsQuestions).reduce(
    (sum, score) => sum + score,
    0,
  )
  const hasPerformanceIssue = hasPerformanceCriteria(performanceQuestions)

  const inattentiveMet = q1to9Score >= 6 && hasPerformanceIssue
  const hyperactiveMet = q10to18Score >= 6 && hasPerformanceIssue
  const combinedMet = inattentiveMet && hyperactiveMet
  const oppositionalMet = q19to26Score >= 4 && hasPerformanceIssue
  const conductMet = q27to40Score >= 3 && hasPerformanceIssue
  const anxietyMet = q41to47Score >= 3 && hasPerformanceIssue

  const criteriaList = [
    { label: 'Predominantly Inattentive Subtype', met: inattentiveMet },
    { label: 'Predominantly Hyperactive/Impulsive Subtype', met: hyperactiveMet },
    { label: 'Combined Inattention/Hyperactivity Subtype', met: combinedMet },
    { label: 'Oppositional-Defiant Disorder Screen', met: oppositionalMet },
    { label: 'Conduct Disorder Screen', met: conductMet },
    { label: 'Anxiety/Depression Screen', met: anxietyMet },
  ]

  const scoreSummary = [
    {
      label: 'Q1–9: Number of questions scored 2 or 3',
      value: q1to9Score,
      weight: 'normal',
    },
    {
      label: 'Q10–18: Number of questions scored 2 or 3',
      value: q10to18Score,
      weight: 'normal',
    },
    {
      label: 'Total number of questions scored 2 or 3 (Q1–18)',
      value: totalQ1to18,
      weight: 'medium',
    },
    {
      label: 'Q19–26: Number of questions scored 2 or 3',
      value: q19to26Score,
      weight: 'normal',
    },
    {
      label: 'Q27–40: Number of questions scored 2 or 3',
      value: q27to40Score,
      weight: 'normal',
    },
    {
      label: 'Q41–47: Number of questions scored 2 or 3',
      value: q41to47Score,
      weight: 'normal',
    },
    {
      label: 'Average Performance Score',
      value: averagePerformance,
      weight: 'medium',
    },
  ]

  return (
    <Box className="space-y-2">
      <Box className="rounded-md bg-gray-1 p-4">
        <Flex align="center" justify="between" className="mb-3">
          <Text size="3" weight="bold">
            Score Calculation
          </Text>
          <Flex gap="2" align="center">
            <Flex align="center" justify="end" gap="1">
              <Badge
                size="1"
                variant="soft"
                mx="1"
                color={'green'}
                className="1px solid border bg-green-4"
              >
                Score {totalScore}
              </Badge>
            </Flex>
            {criteriaList.map(
              (criteria) =>
                criteria.met && (
                  <Text
                    size={'1'}
                    weight="medium"
                    className="flex items-center"
                    key={criteria.label}
                  >
                    ✅ {criteria.label}
                  </Text>
                ),
            )}
          </Flex>
        </Flex>

        <Box className="space-y-2">
          <Flex
            justify="start"
            className="gap-8 border-b border-gray-3 bg-[#EEF2F6] px-2"
          >
            <Text size="1" weight="medium" className="min-w-[400px]">
              Questions
            </Text>
            <Text size="1" weight="medium">
              Value
            </Text>
          </Flex>

          {scoreSummary.map((item, index) => (
            <Flex
              key={`${item.label}-${index}`}
              justify="start"
              className="gap-8 px-2"
            >
              <Text
                size="1"
                className="min-w-[400px]"
                weight={item.weight === 'medium' ? 'medium' : undefined}
              >
                {item.label}
              </Text>
              <Text
                size="1"
                weight={item.weight === 'medium' ? 'medium' : undefined}
              >
                {item.value}
              </Text>
            </Flex>
          ))}
        </Box>
      </Box>

      <Box className="rounded-md bg-gray-1 p-4">
        <Text size="3" weight="bold" className="mb-2 block">
          Score Interpretation
        </Text>

        <Flex gap="4" className="border-t border-[#d2d5d9] py-2">
          {SCORE_INTERPRETATION.map((item, index) => (
            <Box
              key={`${item.title}-${index}`}
              className={cn(
                index !== 0 ? 'border-l border-[#d2d5d9] pl-2' : '',
              )}
            >
              <Text size="2" weight="bold" className="mb-2 block">
                {item.title}
              </Text>
              <ul className="">
                {item.descriptions.map((desc, descIndex) => (
                  <li key={`${item.title}-${descIndex}`}>
                    <Text size="1" className="inline pb-1">
                      {desc}
                    </Text>
                  </li>
                ))}
              </ul>
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  )
}

export { VadprsScoreComponent }
