interface Subscale {
  name: string
  questions: number[]
  desirable: 'T' | 'F'
}

interface SubscaleGroup {
  title: string
  subscales: Subscale[]
}

export interface SubscalesConfig {
  [key: string]: SubscaleGroup
}

import React from 'react'
import { Box, Flex, Table, Text } from '@radix-ui/themes'
import { cn } from '@/utils'

interface ScoreInterpretationTableProps {
  answers: Record<string, boolean>
  className?: string
  interpretationData: SubscalesConfig
}

const ScoreInterpretationDesired = ({
  answers,
  className,
  interpretationData,
}: ScoreInterpretationTableProps) => {
  const calculatePercentage = (questions: number[], desirable: 'T' | 'F') => {
    const answeredQuestions = questions.filter(
      (q) => answers[`Q${q}`] !== undefined,
    )
    if (answeredQuestions.length === 0) return 0

    const nonDesirableCount = answeredQuestions.filter((q) => {
      const answer = answers[`Q${q}`]
      return desirable === 'T' ? !answer : answer
    }).length

    return Math.round((nonDesirableCount / answeredQuestions.length) * 100)
  }

  const getColorClass = (percentage: number) => {
    if (percentage < 25) return 'text-green-9'
    if (percentage <= 74) return 'text-[#F2AE40]'
    if (percentage <= 89) return 'text-[#E97135]'
    return 'text-red-9'
  }

  const renderSubscaleGroup = (
    group: typeof interpretationData.riskLevel,
    key: string,
  ) => (
    <React.Fragment key={key}>
      <Table.Row>
        <Table.Cell
          colSpan={3}
          className="bg-gray-100 font-semibold h-fit px-0 py-3"
        >
          <Text weight="bold" size="3">
            {group.title}
          </Text>
        </Table.Cell>
      </Table.Row>

      <Table.Row className="bg-[#EEF2F6]">
        <Table.Cell className="h-fit py-1 font-medium">
          <Text weight="medium" size="1">
            Subscale
          </Text>
        </Table.Cell>
        <Table.Cell className="h-fit py-1 text-center font-medium">
          <Text weight="medium" size="1">
            Total Items
          </Text>
        </Table.Cell>
        <Table.Cell className="h-fit py-1 text-center font-medium">
          <Text weight="medium" size="1">
            Desirable(%)
          </Text>
        </Table.Cell>
      </Table.Row>

      {group.subscales.map((subscale) => {
        const percentage = calculatePercentage(
          subscale.questions,
          subscale.desirable as 'T' | 'F',
        )
        const colorClass = getColorClass(percentage)

        return (
          <Table.Row key={subscale.name} className="border-gray-200 border-b">
            <Table.Cell className="h-fit py-1">
              <Text size="1">{subscale.name}</Text>
            </Table.Cell>
            <Table.Cell className="h-fit py-1 text-center">
              <Text size="1">{subscale.questions.length}</Text>
            </Table.Cell>
            <Table.Cell className="h-fit py-1 text-center">
              <Text size="1" className={cn(colorClass, 'font-medium')}>
                {percentage.toFixed(1)}%
              </Text>
            </Table.Cell>
          </Table.Row>
        )
      })}
      <Table.Row>
        <Table.Cell colSpan={3} className="h-fit py-0">
          <Box className="h-[1px] w-full bg-gray-5" />
        </Table.Cell>
      </Table.Row>
    </React.Fragment>
  )

  return (
    <Box className={cn('w-full border border-gray-5 p-2', className)}>
      <Box className="border-b border-gray-5 pb-2">
        <Text size="4" weight="bold">
          Score Interpretation
        </Text>
      </Box>

      <Table.Root variant="surface" size="2" className="border-0">
        <Table.Body>
          {renderSubscaleGroup(interpretationData.riskLevel, 'risk')}
          {renderSubscaleGroup(
            interpretationData.positiveDescriptor,
            'positive',
          )}
          {renderSubscaleGroup(
            interpretationData.negativeDescriptor,
            'negative',
          )}
        </Table.Body>
      </Table.Root>

      <Flex
        justify="start"
        align="center"
        gap="4"
        mt="4"
        wrap="wrap"
        className="mx-2 border border-gray-5 p-1"
      >
        <Text size="1" weight="medium" className="font-bold">
          Score Calculation
        </Text>
        <Flex align="center" gap="1">
          <Box className="rounded-sm h-[14px] w-[22px] bg-green-9" />
          <Text size="1">&lt;25% - Acceptable (low risk)</Text>
        </Flex>
        <Flex align="center" gap="1">
          <Box className="rounded-sm h-[14px] w-[22px] bg-[#F2AE40]" />
          <Text size="1">25-74% - Marginal (borderline)</Text>
        </Flex>
        <Flex align="center" gap="1">
          <Box className="rounded-sm h-[14px] w-[22px] bg-[#E97135]" />
          <Text size="1">75-89% - High Risk</Text>
        </Flex>
        <Flex align="center" gap="1">
          <Box className="rounded-sm h-[14px] w-[22px] bg-red-9" />
          <Text size="1">90-100% - Very High Risk</Text>
        </Flex>
      </Flex>
    </Box>
  )
}

export { ScoreInterpretationDesired, type ScoreInterpretationTableProps }
