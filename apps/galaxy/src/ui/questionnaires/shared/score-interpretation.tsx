import React from 'react'
import { Badge, Box, Flex, Text } from '@radix-ui/themes'
import { cn } from '@/utils'

interface ScoreInterpretationRange {
  rangeTitle?: string
  label?: string
  color: string
  min: number
  max?: number
}

interface ScoreInterpretationProps {
  ranges: ScoreInterpretationRange[]
  totalScore: number
  isRanges?: boolean
  showScoreLabel?: boolean
  heading?: string
  subHeading?: string
}

const ScoreInterpretation = ({
  ranges,
  totalScore,
  isRanges = true,
  showScoreLabel = true,
  heading = 'Score Interpretation',
  subHeading,
}: ScoreInterpretationProps) => {
  const currentRange = getRange(ranges, totalScore)

  return (
    <Flex className="border-y border-gray-3" direction="column">
      <Flex align="center" justify="between" px="2" py="1">
        <Flex className="" gap="4">
          <Text weight="bold" size="2">
            {heading}
          </Text>
          {isRanges &&
            ranges.map((range) => {
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
            color={getBadgeColor(getRange(ranges, totalScore))}
            className={cn(
              getBadgeColor(getRange(ranges, totalScore)),
              '1px solid border',
            )}
          >
            Score {totalScore}
          </Badge>
          {showScoreLabel && <Text size="1">{currentRange?.label}</Text>}
        </Flex>
      </Flex>
      {subHeading && (
        <Text className="pb-1 pl-2" size="1">
          {subHeading}
        </Text>
      )}
    </Flex>
  )
}

const getRange = (ranges: ScoreInterpretationRange[], score: number) => {
  return ranges.find((range) => {
    if (range.max !== undefined) {
      return score >= range.min && score <= range.max
    }

    return score >= range.min
  })
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
    case 'blue':
      return 'blue'
    case 'orange':
      return 'orange'
    default:
      return 'gray'
  }
}

const getBadgeBackgroundClass = (color: string) => {
  switch (color.toLocaleLowerCase()) {
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
    case 'blue':
      return 'bg-blue-9'
    case 'orange':
      return 'bg-[orange]'
    default:
      return 'bg-gray'
  }
}

export {
  ScoreInterpretation,
  getBadgeColor,
  getRange,
  type ScoreInterpretationRange,
}
