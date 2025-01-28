import { Flex, Text } from '@radix-ui/themes'
import { BlockLabel, NumberInput, SelectInput } from '@/components'

const FREQUENCY_UNIT_OPTIONS = [
  {
    label: 'Day',
    value: 'Day',
  },
  {
    label: 'Week',
    value: 'Week',
  },
  {
    label: 'Month',
    value: 'Month',
  },
]

const TreatmentRegime = ({
  isThetaBurst = false,
}: {
  isThetaBurst?: boolean
}) => {
  return (
    <Flex direction="column">
      <BlockLabel required className="text-1 font-bold">
        Treatment Regime
      </BlockLabel>
      <Flex direction="row" gap="1" align="center">
        <NumberInput
          label="Frequency of Sessions"
          field={
            isThetaBurst ? 'thetaBurstFrequencyOfSession' : 'frequencyOfSession'
          }
          className="h-6 w-9"
          required
          showError
        />
        <Text className="text-4">/</Text>
        <SelectInput
          field={isThetaBurst ? 'frequencyUnitThetaBurst' : 'frequencyUnit'}
          options={FREQUENCY_UNIT_OPTIONS}
          defaultValue="Week"
          className="mr-3"
        />
        <NumberInput
          label="No. of Planned Sessions"
          field={isThetaBurst ? 'plannedSessionThetaBurst' : 'plannedSession'}
          className="h-6 w-24"
          required
          showError
        />
      </Flex>
    </Flex>
  )
}

export { TreatmentRegime }
