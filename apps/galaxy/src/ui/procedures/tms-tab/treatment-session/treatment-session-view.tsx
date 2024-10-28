import { Flex } from '@radix-ui/themes'
import { BlockLabel, TextInput } from '@/components'
import { CurrentTreatmentSessionView } from './current-treatment-session'
import { MotorThreshold } from './motor-threshold'
import { PrecautionAndWarning } from './precaution-warning'
import { ProtocolUsed } from './protocol-used'
import { TreatmentObservation } from './treatment-observation'

const TreatmentSessionView = () => {
  return (
    <>
      <BlockLabel required className="text-3 font-[600]">
        Treatment Session
      </BlockLabel>
      <Flex direction="row" gap="1">
        <TextInput
          required
          label="TMS Session No"
          field="tmdSessionNo"
          disabled
        />
      </Flex>
      <ProtocolUsed />
      <PrecautionAndWarning />
      <MotorThreshold />
      <CurrentTreatmentSessionView />
      <TreatmentObservation />
    </>
  )
}

export { TreatmentSessionView }
