import { Flex } from '@radix-ui/themes'
import { BlockLabel } from '@/components'
import {
  ContinueWithCurrentProtocol,
  ContinueWithMaintainance,
  DiscontinueTreatmentBlock,
  FollowUpScreeningBlock,
  PlanSelectionBlock,
  ReferralBlock,
} from './blocks'

const DischargePlan = () => {
  return (
    <Flex direction="column" className="mt-2" gap="2">
      <BlockLabel className="text-3 font-[600]">Discharge Plan</BlockLabel>
      <PlanSelectionBlock />
      <ContinueWithCurrentProtocol />
      <ContinueWithMaintainance />
      <DiscontinueTreatmentBlock />
      <ReferralBlock />
      <FollowUpScreeningBlock />
    </Flex>
  )
}

export { DischargePlan }
