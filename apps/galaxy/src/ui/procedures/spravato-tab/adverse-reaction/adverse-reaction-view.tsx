'use client'

import { Flex } from '@radix-ui/themes'
import { BlockLabel } from '@/components'
import {
  AnxietyBlock,
  DissociationBlock,
  DizzinessAndVertigo,
  IncreasedInBloodPressureBlock,
  LethargyBlock,
  NauseaAndVomitingBlock,
  RespiratoryChangesBlock,
  SedationBlock,
} from './blocks'

const AdverseReactionView = () => {
  return (
    <Flex direction="column" className="mt-2">
      <BlockLabel required className="text-3 font-[600]">
        Adverse Reactions
      </BlockLabel>
      <Flex
        direction="column"
        className="mt-2 gap-2 rounded-3 border border-gray-7 p-2"
      >
        <BlockLabel required className="text-2 font-medium">
          Did the Patient experience any of the following reactions?
        </BlockLabel>
        <SedationBlock />
        <DissociationBlock />
        <DizzinessAndVertigo />
        <NauseaAndVomitingBlock />
        <AnxietyBlock />
        <LethargyBlock />
        <IncreasedInBloodPressureBlock />
        <RespiratoryChangesBlock />
      </Flex>
    </Flex>
  )
}

export { AdverseReactionView }
