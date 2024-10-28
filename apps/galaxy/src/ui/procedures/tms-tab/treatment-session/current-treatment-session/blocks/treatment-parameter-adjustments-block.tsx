import { Flex } from '@radix-ui/themes'
import { BlockLabel, CodesetSelect } from '@/components'
import { CODESETS } from '@/constants'

const TreatmentParameterAdjustments = () => {
  return (
    <Flex direction="row" gap="1" align="center">
      <BlockLabel required>Treatment Parameter Adjustments</BlockLabel>
      <CodesetSelect
        name="treatmentParameter"
        codeset={CODESETS.ParameterAdjustmentStatus}
        size="1"
        className="max-w-44"
      />
    </Flex>
  )
}

export { TreatmentParameterAdjustments }
