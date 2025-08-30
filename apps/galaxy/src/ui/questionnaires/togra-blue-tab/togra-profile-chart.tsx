import { Box, Flex, Text } from '@radix-ui/themes'

interface TograProfileChartProps {
  rawScore: number
  griScore: number
}

export const TograProfileChart = ({
  rawScore,
  griScore,
}: TograProfileChartProps) => {
  const getRawScorePosition = (score: number): number => {
    if (score <= 40) return 0
    if (score >= 150) return 100
    return ((score - 40) / (150 - 40)) * 100
  }

  const getGriScorePosition = (score: number): number => {
    if (score <= 40) return 0
    if (score >= 160) return 100
    return ((score - 40) / (160 - 40)) * 100
  }

  const getTickMarkClassName = (
    isBig: boolean,
    isFifthLine: boolean,
    color: string,
  ) => {
    if (isBig) {
      return `h-3 w-0.5 ${color}`
    }
    if (isFifthLine) {
      return `h-6 w-0.5 ${color}`
    }
    return `h-2 w-0.5 ${color}`
  }

  const getScaleNumberText = (mark: number, values: number[]) => {
    if (mark === values[0]) {
      return `≤${values[0]}`
    }
    if (mark === values[values.length - 1]) {
      return `≥${values[values.length - 1]}`
    }
    return mark
  }

  const renderTickMarks = (
    startValue: number,
    endValue: number,
    color: string,
    isTopPosition: boolean,
  ) => {
    const tickValues = Array.from(
      { length: (endValue - startValue) / 2 + 1 },
      (_, i) => startValue + i * 2,
    )

    return (
      <Box
        className={`absolute left-0 right-0 ${
          isTopPosition ? 'top-[-8px]' : 'bottom-[-8px]'
        }`}
      >
        {tickValues.map((value) => {
          const isBig = value % 10 === 0
          const leftPercent =
            ((value - startValue) / (endValue - startValue)) * 100
          const isFifthLine = (value - startValue) % 10 === 8

          return (
            <Box
              key={value}
              className="absolute"
              style={{
                left: `${leftPercent}%`,
                transform: 'translateX(-50%)',
              }}
            >
              <Box
                className={getTickMarkClassName(isBig, isFifthLine, color)}
                style={{
                  [isTopPosition ? 'bottom' : 'top']: '0px',
                }}
              />
            </Box>
          )
        })}
      </Box>
    )
  }

  const renderScaleNumbers = (values: number[], color: string) => (
    <Box className="mb-4 flex justify-between">
      {values.map((mark) => (
        <Box key={mark} className="flex flex-col items-center">
          <Text size="1" className={`font-medium ${color}`}>
            {getScaleNumberText(mark, values)}
          </Text>
        </Box>
      ))}
    </Box>
  )

  const rawScorePosition = getRawScorePosition(rawScore)
  const griScorePosition = getGriScorePosition(griScore)

  return (
    <Box className="mx-auto w-full max-w-4xl">
      <Box className="mb-6">
        <Text size="4" weight="bold" className="text-gray-900">
          TOGRA Profile
        </Text>
      </Box>

      <Box className="mb-8">
        <Flex justify="center" className="mb-3">
          <Box className="text-white rounded-lg bg-[#0091FF] px-3 py-1 font-medium">
            Raw Score
          </Box>
        </Flex>

        {renderScaleNumbers(
          [40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
          'text-[#0091FF]',
        )}

        <Box className="relative">
          <Box className="relative h-1 w-full bg-[#0091FF]">
            <Box
              className="absolute h-3 bg-[#0091FF]"
              style={{
                left: '0%',
                width: `${rawScorePosition}%`,
                top: '0px',
              }}
            />

            {renderTickMarks(40, 150, 'bg-[#0091FF]', true)}
          </Box>
        </Box>
      </Box>

      <Box className="mb-2 mt-12">
        <Box className="relative">
          <Box className="relative h-1 w-full bg-[#30A46C]">
            <Box
              className="absolute h-3 bg-[#30A46C]"
              style={{
                left: '0%',
                width: `${griScorePosition}%`,
                bottom: '0px',
              }}
            />

            {renderTickMarks(40, 160, 'bg-[#30A46C]', false)}
          </Box>
        </Box>

        {renderScaleNumbers(
          [40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160],
          'text-[#30A46C]',
        )}

        <Flex justify="center" className="mt-3">
          <Box className="text-white rounded-lg bg-[#30A46C] px-3 py-1 font-medium">
            GRI
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}
