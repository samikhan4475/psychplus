import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, RadioSelectSection, TextInput } from '@/components'
import { TypeOfThetaBurst } from '../../types'
import { UnitInput } from '../../unit-input'
import { TreatmentRegime } from './treatment-regime-block'

const BURST_PATTERN_OPTIONS = [
  {
    label: 'Continuous',
    value: 'Continuous',
  },
  {
    label: 'Intermittent',
    value: 'Intermittent',
  },
]

const ThetaBurstSimulation = () => {
  const form = useFormContext()

  const typeOfThetaBurst = form.watch('typeOfThetaBurst')
  const protocol = form.watch('protocol')

  return (
    <>
      <BlockLabel className="text-2 font-[600]">{protocol}</BlockLabel>
      <Text className="text-pp-black-3 text-1 font-regular">
        Involves bursts of magnetic pulses delivered at a theta frequency (5 Hz)
        typically delivered over the left dorsolateral prefrontal cortex. The
        treatment duration is 3 minutes per session and is typically
        administered daily (five days per week) for several weeks. The intensity
        is adjusted to the patient&lsquo;s resting motor threshold.
      </Text>
      <RadioSelectSection
        label="Type of Theta Burst"
        field="typeOfThetaBurst"
        options={[
          {
            label: TypeOfThetaBurst.ContinuesThetaBurst,
            value: TypeOfThetaBurst.ContinuesThetaBurst,
          },
          {
            label: TypeOfThetaBurst.IntermittentThetaBurst,
            value: TypeOfThetaBurst.IntermittentThetaBurst,
          },
        ]}
      />

      <Flex direction="row" gap="1" className="align-middle">
        <BlockLabel required>Duration</BlockLabel>
        {typeOfThetaBurst === TypeOfThetaBurst.ContinuesThetaBurst && (
          <UnitInput field={'durationFrom'} symbol="sec" />
        )}
        {typeOfThetaBurst === TypeOfThetaBurst.IntermittentThetaBurst && (
          <UnitInput field={'intermittentDurationFrom'} symbol="sec" />
        )}
        {typeOfThetaBurst === TypeOfThetaBurst.ContinuesThetaBurst && (
          <>
            <Text className="text-4 font-regular">-</Text>
            <UnitInput field="durationTo" symbol="sec" />
          </>
        )}
      </Flex>

      <BlockLabel required className="text-1 font-[600]">
        Stimulation Parameters
      </BlockLabel>

      <Flex direction="row" gap="1">
        <BlockLabel className="text-1 font-[600]">Frequency:</BlockLabel>
        <TextInput field="frequency" disabled />
      </Flex>

      <RadioSelectSection
        label="Burst Pattern"
        field="burstPattern"
        options={BURST_PATTERN_OPTIONS}
      />
      <TreatmentRegime />
    </>
  )
}

export { ThetaBurstSimulation }
