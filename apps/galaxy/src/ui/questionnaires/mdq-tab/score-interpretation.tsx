import React from 'react'
import { Badge, Box, Flex, Text } from '@radix-ui/themes'
import { cn } from '@/utils'
import { getBadgeBackgroundClass } from '../shared/score-interpretation'
import { SCORE_INTERPRETATION_RANGES } from './constants'

interface ScoreInterpretationProps {
  totalScore: number
  Q14?: string
  Q15?: string
}

const MdqScoreInterpretation = ({
  totalScore,
  Q14,
  Q15,
}: ScoreInterpretationProps) => {
  const currentState = getMdqBadge(totalScore, Q14, Q15)

  return (
    <Flex className="border-y border-gray-3" direction="column">
      <Flex
        align="center"
        justify="between"
        px="2"
        py="1"
        className="border border-gray-3"
      >
        <Flex className="" gap="4">
          <Text weight="bold" size="2">
            Score Interpretation
          </Text>
          {SCORE_INTERPRETATION_RANGES.map((range) => {
            const badgeBackgroundClass = getBadgeBackgroundClass(range.color)

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
                  {range.label}
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
            color={currentState.color}
            className={cn(currentState.color, '1px solid border')}
          >
            Score {totalScore}
          </Badge>
          <Text size="1">{currentState?.label}</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

const getMdqBadge = (score: number, Q14?: string, Q15?: string) => {
  const isPositive =
    score >= 7 && Q14 === '1' && ['moderate', 'serious'].includes(Q15 ?? '')

  return {
    label: isPositive ? 'Positive Result' : 'Negative Result',
    color: (isPositive ? 'green' : 'red') as 'green' | 'red',
  }
}

export { MdqScoreInterpretation, getMdqBadge }
