import { Flex, Text } from '@radix-ui/themes'
import { EctWidgetSchemaType } from '@/ui/procedures/ect-tab/ect-tab-schema'
import { LabelAndValue } from '../shared'

interface EctListViewProps {
  label?: string
  keys: { label: string; key: string }[]
  data: EctWidgetSchemaType
  anesthesiologistCodes?: Record<string, string>
}

const secondsToAddIn = ['ectSettingBlockDuration', 'ectSeizureDuration']

const EctListView = ({
  label,
  keys,
  data,
  anesthesiologistCodes,
}: EctListViewProps) => (
  <Flex direction="column">
    {label && (
      <Text className="whitespace-nowrap text-1 font-medium">{label}</Text>
    )}
    {keys.map((option) => {
      const value = option.key
        ? data[option.key as keyof EctWidgetSchemaType]
        : ''
      const displayValue =
        option.key === 'anesthesiologist' && anesthesiologistCodes
          ? anesthesiologistCodes[value as string] || value
          : value

      return (
        <LabelAndValue
          key={option.label}
          label={option.label}
          value={
            secondsToAddIn.includes(option.key)
              ? `${displayValue} seconds`
              : displayValue
          }
        />
      )
    })}
  </Flex>
)

export default EctListView
