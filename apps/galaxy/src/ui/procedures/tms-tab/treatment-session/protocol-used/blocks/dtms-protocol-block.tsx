import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, NumberInput } from '@/components'
import { ProtocolTitles } from '../../types'
import { TreatmentRegime } from './treatment-regime-block'

const DTMSProtocol = () => {
  const form = useFormContext()
  const protocol = form.watch('protocol')

  return (
    <>
      <BlockLabel className="text-2 font-[600]">{protocol}</BlockLabel>
      <Text className="text-pp-black-3 text-1 font-regular">
        Involves the delivery of repetitive magnetic pulses to stimulate the
        brain. The treatment targets specific regions, such as the prefrontal
        cortex, and is typically administered daily (five days per week) for
        several weeks. The intensity is adjusted to the patient’s resting motor
        threshold.
      </Text>
      <BlockLabel required className="text-1 font-bold">
        Stimulation Parameters
      </BlockLabel>
      <Flex direction="row" gap="1" className="align-middle">
        <NumberInput
          label="Frequency"
          field="dtmsStimulationFrequency"
          className="h-6 w-24"
          required
          showError
        />
        <NumberInput
          label="Pulse Train Duration"
          field="dtmsStimulationPulseTrainDuration"
          className="h-6 w-24"
          required
          showError
        />
        <NumberInput
          label="Inter-Train Interval"
          field="dtmsStimulationInterTrainInterval"
          className="h-6 w-24"
          required
          showError
        />
      </Flex>
      <TreatmentRegime name={ProtocolTitles.DTMSProtocol} />
    </>
  )
}

export { DTMSProtocol }
