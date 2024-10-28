import { Flex } from '@radix-ui/themes'
import { BlockLabel } from '@/components'
import {
  CoilTypeUsed,
  StimulationIntensity,
  StimulationSite,
  TreatmentParameterAdjustments,
} from './blocks'

const CurrentTreatmentSessionView = () => {
  return (
    <Flex direction="column" gap="1">
      <BlockLabel required className="text-2 font-[600]">
        Current Treatment Session
      </BlockLabel>
      <StimulationIntensity />
      <StimulationSite />
      <CoilTypeUsed />
      <TreatmentParameterAdjustments />
    </Flex>
  )
}

export { CurrentTreatmentSessionView }
