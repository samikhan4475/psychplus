import React, { useState } from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import { SmokingCessationBlock } from '../smoking-cessation-block'
import TobaccoHistory from './tobacco-history'
import TobaccoStart from './tobacco-start'

const SmokingBlock = () => {
  const [selectedCessationTime, setSelectedCessationTime] = useState<
    string | null
  >(null)

  const handleSelectCessationTime = (item: string) => {
    setSelectedCessationTime((prev) => (prev === item ? null : item))
  }

  return (
    <>
      <Flex justify={'center'} align={'start'} direction={'column'}>
        <TobaccoHistory />
      </Flex>
      <TobaccoStart />
      <SmokingCessationBlock />
      <Flex justify={'center'} align={'start'} direction={'column'}>
        <Text weight="bold" className="pb-1.5">
          Discussed smoking cessation for:
        </Text>
        <Flex gap="3">
          {['≥ 3 mins', '≥ 11 mins'].map((item) => {
            const isSelected = selectedCessationTime === item
            return (
              <Box
                className={`rounded-2 border ${
                  isSelected
                    ? 'text-white border-[#194595] bg-[#194595]'
                    : 'border-[#B9BBC6] bg-[#F7F9FC]'
                } cursor-pointer px-[10px] py-[6px]`}
                key={item}
                onClick={() => handleSelectCessationTime(item)}
              >
                <Text
                  className="whitespace-nowrap text-[14px] capitalize"
                  weight="light"
                >
                  {item}
                </Text>
              </Box>
            )
          })}
        </Flex>
      </Flex>
    </>
  )
}

export default SmokingBlock
