import { Flex, Text } from '@radix-ui/themes'
import { BlockLabel, NumberInput, SelectInput } from '@/components'
import { ProtocolTitles } from '../../types'

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
type fieldKeys = {
  unit: string
  frequencyOfSession: string
  plannedSession: string
}

const fields: Partial<Record<ProtocolTitles, fieldKeys>> = {
  [ProtocolTitles.ThetaBurstStimulation]: {
    frequencyOfSession: 'thetaBurstFrequencyOfSession',
    plannedSession: 'plannedSessionThetaBurst',
    unit: 'frequencyUnitThetaBurst',
  },
  [ProtocolTitles.DTMSProtocol]: {
    frequencyOfSession: 'dtmsFrequencyOfSession',
    plannedSession: 'dtmsPlannedSession',
    unit: 'dtmsFrequencyUnit',
  },
  [ProtocolTitles.MaintenanceProtocol]: {
    frequencyOfSession: 'frequencyOfSession',
    plannedSession: 'plannedSession',
    unit: 'frequencyUnit',
  },
}
const TreatmentRegime = ({ name }: { name: ProtocolTitles }) => {
  return (
    <Flex direction="column">
      <BlockLabel required className="text-1 font-bold">
        Treatment Regime
      </BlockLabel>
      <Flex direction="row" gap="1" align="center">
        <NumberInput
          label="Frequency of Sessions"
          field={fields?.[name]?.frequencyOfSession ?? ''}
          className="h-6 w-9"
          required
          showError
        />
        <Text className="text-4">/</Text>
        <SelectInput
          field={fields?.[name]?.unit}
          options={FREQUENCY_UNIT_OPTIONS}
          defaultValue="Week"
          className="mr-3"
        />
        <NumberInput
          label="No. of Planned Sessions"
          field={fields?.[name]?.plannedSession ?? ''}
          className="h-6 w-24"
          required
          showError
        />
      </Flex>
    </Flex>
  )
}

export { TreatmentRegime }
