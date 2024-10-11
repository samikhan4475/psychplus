import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { QuickNoteHistory } from '@/types'
import { Chart } from './chart'
import { ScoreBadges } from './score-badges'

interface ChartVisit7Props {
  data: QuickNoteHistory[]
  questionnaire?: string
}

const ChartVisits = ({ data, questionnaire }: ChartVisit7Props) => {
  const ranges = [
    {
      label: 'No Anxiety',
      color: 'bg-white',
    },
    {
      label: 'Mild Anxiety',
      color: 'bg-green-9',
    },
    {
      label: 'Moderate Anxiety',
      color: 'bg-yellow-5',
    },
    {
      label: 'Severe Anxiety',
      color: 'bg-red-9',
    },
  ]
  return (
    <Flex direction="column">
      <Flex mt="2" align="center">
        <Text className="-ml-10 w-[15%] -rotate-90 text-center">
          {questionnaire} Score
        </Text>
        <Chart data={data} />
      </Flex>
      <ScoreBadges ranges={ranges} />
    </Flex>
  )
}

export { ChartVisits }
