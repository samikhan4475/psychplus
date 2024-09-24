import React from 'react'
import { Badge, Box, Flex, Text } from '@radix-ui/themes'
import { cn } from '@/utils'

interface ScoreInterpretationRange {
  rangeTitle?: string
  label: string
  color: string
  min: number
  max?: number
}

interface ScoreInterpretationProps {
  ranges: ScoreInterpretationRange[]
  totalScore: number
}

const ScoreInterpretation = ({
  ranges,
  totalScore,
}: ScoreInterpretationProps) => {
  const getRange = (score: number) => {
    return ranges.find((range) => {
      if (range.max !== undefined) {
        return score >= range.min && score <= range.max
      }

      return score >= range.min
    })
  }

  const currentRange = getRange(totalScore)

  return (
    <Flex
      align="center"
      justify="between"
      className="h-9 border-y border-gray-3"
      px="2"
    >
      <Flex className="" gap="4">
        <Text weight="bold" size="2">
          Score Interpretation
        </Text>
        {ranges.map((range) => {
          const badgeBackgroundClass = getBadgeBackgroundClass(range.color)

          let title = range.rangeTitle

          if (!title) {
            const maxPart = range.max !== undefined ? `-${range.max}` : ''
            title = `${range.min}${maxPart}`
          }
          return (
            <Flex gap="2" align="center" key={range.label}>
              <Box
                className={cn(
                  'h-[14.24px] w-[22px] rounded-1',
                  range.color === 'white' && 'border border-gray-6',
                  badgeBackgroundClass,
                )}
              />
              <Text className="text-black" size="1">
                {title} - {range.label}
              </Text>
            </Flex>
          )
        })}
      </Flex>

      <Flex align="center" gap="1">
        <Badge
          size="1"
          variant="soft"
          mx="1"
          color={getBadgeColor(getRange(totalScore))}
          className={cn(
            getBadgeColor(getRange(totalScore)),
            '1px solid border',
          )}
        >
          Score {totalScore}
        </Badge>
        <Text size="1">{currentRange?.label}</Text>
      </Flex>
    </Flex>
  )
}

const getBadgeColor = (currentRange?: ScoreInterpretationRange) => {
  switch (currentRange?.color) {
    case 'dark red':
      return 'red'
    case 'green':
      return 'green'
    case 'yellow':
      return 'yellow'
    case 'red':
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
