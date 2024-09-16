import React from 'react'
import { Badge, Box, Flex, Text } from '@radix-ui/themes'
import { cn } from '@/utils'

interface ScoreInterpretationRange {
  rangeTitle?: string
  label: string
  color: string
  min: number
  max: number
}

interface ScoreInterpretationProps {
  ranges: ScoreInterpretationRange[]
  totalScore: number
}

const ScoreInterpretation = ({
  ranges,
  totalScore,
}: ScoreInterpretationProps) => {
  const getRangeLabel = (score: number) => {
    for (const range of ranges) {
      if (score >= range.min && score <= range.max) {
        return range.label
      }
    }
  }

  const currentRangeLabel = getRangeLabel(totalScore)

  return (
    <Flex
      align="center"
      justify="between"
      className="h-9 border-y border-gray-3"
    >
      <Flex className="" gap="4">
        <Text weight="bold" size="2">
          Score Interpretation
        </Text>
        {ranges.map((range) => (
          <Flex gap="2" align="center" key={range.label}>
            <Box
              key={range.label}
              className={cn(
                'h-[14.24px] w-[22px] rounded-1',
                range.color === 'white' && 'border border-gray-6',
                getBadgeBackgroundClass(range.color),
              )}
            ></Box>
            <Text className="text-black" size="1">
              {range.rangeTitle
                ? range.rangeTitle
                : `${range.min}-${range.max}`}{' '}
              - {range.label}
            </Text>
          </Flex>
        ))}
      </Flex>

      <Flex align="center" gap="1">
        <Badge
          size="1"
          variant="soft"
          mx="1"
          color={getBadgeColor(currentRangeLabel)}
          className={`border 1px solid ${getBadgeColor(currentRangeLabel)}`}
        >
          Score {totalScore}
        </Badge>
        <Text size="1">{currentRangeLabel}</Text>
      </Flex>
    </Flex>
  )
}

const getBadgeColor = (anxiety?: string) => {
  switch (anxiety?.split(' ')[0]) {
    case 'Mild':
      return 'green'
    case 'Moderate':
      return 'yellow'
    case 'Severe':
      return 'red'
    case 'Very':
      return 'red'
    default:
      return 'gray'
  }
}

const getBadgeBackgroundClass = (color: string) => {
  switch (color) {
    case 'white':
      return 'bg-[white]'
    case 'green':
      return 'bg-green-9'
    case 'yellow':
      return 'bg-yellow-5'
    case 'red':
      return 'bg-red-9'
    case 'dark red':
      return 'bg-[red]'
    default:
      return 'bg-gray'
  }
}

export { ScoreInterpretation, type ScoreInterpretationRange }
