import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { QuickNoteSectionItem } from '@/types'
import { calculateTotalScore } from '../../../utils'


const ScoreBlock = ({ data }: { data: QuickNoteSectionItem[] }) => {
  return (
    <Flex
      className="bg-pp-green-100 border-pp-green-2 rounded-5 border border-solid"
      align="center"
      pl="2"
      pr="2"
    >
      <Text className="text-pp-green-1 text-1 font-regular">
        {calculateTotalScore(data)}
      </Text>
    </Flex>
  )
}

export { ScoreBlock }
