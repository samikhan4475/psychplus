import React, { useEffect } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { QuickNoteSectionItem } from '@/types'
import { useStore } from '@/ui/procedures/store'

const calculateTotalScore = (data: QuickNoteSectionItem[]): number => {
  let totalScore = 0
  data.forEach((element: QuickNoteSectionItem) => {
    const value = Number(element.sectionItemValue) || 0
    totalScore += value
  })
  return totalScore
}
const PhqScoreBlock = ({ data }: { data: QuickNoteSectionItem[] }) => {
  const { setPhq9Score } = useStore((state) => ({
    setPhq9Score: state.setPhq9Score,
  }))
  useEffect(() => {
    const res = calculateTotalScore(data)
    setPhq9Score(data.length > 0 ? res.toString() : '')
  }, [])

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

export default PhqScoreBlock
