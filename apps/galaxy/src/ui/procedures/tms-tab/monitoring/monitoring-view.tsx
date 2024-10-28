'use client'

import { Flex, Text } from '@radix-ui/themes'
import { BlockLabel } from '@/components'
import DizzinessBlock from './blocks/dizziness-block'
import FatigueBlock from './blocks/fatigue-block'
import HeadacheBlock from './blocks/headache-block'
import MuscleBlock from './blocks/muscle-block'
import OtherBlock from './blocks/other-block'
import ScalpBlock from './blocks/scalp-block'
import SeizureBlock from './blocks/seizure-block'
import SuicideBlock from './blocks/suicide-block'

const MonitoringView = () => {
  return (
    <Flex direction="column" className="mt-2">
      <BlockLabel required className="text-3 font-[600]">
        Monitoring
      </BlockLabel>
      <Flex
        direction={'column'}
        className="mt-2 gap-2 rounded-3 border border-gray-7 p-2"
      >
        <Text size="2" weight="medium">
          Side Effects & Adverse Reactions
        </Text>
        <Text size="1" weight="medium">
          Did the Patient experience any of the following adverse reactions or
          side effects?
        </Text>
        <SeizureBlock />
        <HeadacheBlock />
        <FatigueBlock />
        <ScalpBlock />
        <MuscleBlock />
        <DizzinessBlock />
        <OtherBlock />
        <SuicideBlock />
      </Flex>
    </Flex>
  )
}

export default MonitoringView
