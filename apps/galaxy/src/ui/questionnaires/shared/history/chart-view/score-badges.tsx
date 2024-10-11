import React from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import { cn } from '@/utils'

interface ScoreInterpretationRange {
  label: string
  color: string
}

interface ScoreInterpretationProps {
  ranges: ScoreInterpretationRange[]
}

const ScoreBadges = ({ ranges }: ScoreInterpretationProps) => {
  return (
    <Flex justify='center'>
      <Flex align="center" gap="6" width='75%'>
        {ranges &&
          ranges.map((range) => {
            return (
              <Flex gap="2" align="center" key={range.label}>
                <Box
                  className={cn(
                    'h-[14.24px] w-[22px] rounded-1',
                    range.color === 'bg-white' && 'border border-gray-6',
                    range.color,
                  )}
                />
                <Text className="text-black" size="1">
                  {range.label}
                </Text>
              </Flex>
            )
          })}
      </Flex>
    </Flex>
  )
}

export { ScoreBadges }
