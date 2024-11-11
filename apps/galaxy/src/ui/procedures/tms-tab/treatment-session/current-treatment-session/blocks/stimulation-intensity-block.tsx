import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel } from '@/components'
import { UnitInput } from '../../unit-input'

const FIELDS = [
  {
    id: 1,
    label: 'The optimal stimulation level was defined as',
    field: 'optimalStimulationLevel',
    symbol: '%',
    disabled: false,
  },
  {
    id: 2,
    label: 'of Motor Threshold',
    field: 'motorThersholdValue',
    symbol: '%',
    disabled: true,
  },
  {
    id: 3,
    label: 'Therefore, the stimulation level of this session was',
    field: 'stimulationLevel',
    symbol: '%',
    disabled: true,
  },
]

const StimulationIntensity = () => {
  const form = useFormContext()

  const [optimalStimulationLevel, motorThersholdValue] = form.watch([
    'optimalStimulationLevel',
    'motorThersholdValue',
  ])

  useEffect(() => {
    form.setValue(
      'stimulationLevel',
      (optimalStimulationLevel * motorThersholdValue).toString(),
    )
  }, [optimalStimulationLevel, motorThersholdValue])

  return (
    <Flex direction="row" gap="1" align="center">
      <BlockLabel required>Stimulation Intensity</BlockLabel>
      {FIELDS.map((item) => (
        <UnitInput
          key={item.id}
          label={item.label}
          field={item.field}
          symbol={item.symbol}
          disabled={item.disabled}
        />
      ))}
    </Flex>
  )
}

export { StimulationIntensity }
