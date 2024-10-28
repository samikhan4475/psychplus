'use client'

import { Flex } from '@radix-ui/themes'
import { BlockLabel } from '@/components'
import { MotorThresholdDialog, ThresholdTable } from './blocks'

const MotorThreshold = () => {
  return (
    <Flex direction="column" gap="1">
      <Flex direction="row" align="center" gap="2">
        <BlockLabel required className="text-1 font-[600]">
          Motor Threshold Determination (MT)
        </BlockLabel>
        <MotorThresholdDialog />
      </Flex>
      <ThresholdTable className="w-[35%]" renderFirstRowOnly />
    </Flex>
  )
}

export { MotorThreshold }
