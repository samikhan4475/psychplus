import { Flex, Text } from '@radix-ui/themes'
import { LabelAndValue } from '../shared'

interface EctListViewProps<T extends object> {
  label?: string
  keys: { label: string; key: string }[]
  data: T
  anesthesiologistCodes?: Record<string, string>
}

const secondsToAddIn = ['ectSettingBlockDuration', 'ectSeizureDuration']

const EctListView = <T extends object>({
  label,
  keys,
  data,
  anesthesiologistCodes,
}: EctListViewProps<T>) => (
  <Flex direction="column">
    {label && (
      <Text className="whitespace-nowrap text-1 font-medium">{label}</Text>
    )}
    {keys.map((option) => {
      const value = option.key ? data[option.key as keyof T] : ''
      const displayValue =
        option.key === 'anesthesiologist' && anesthesiologistCodes
          ? anesthesiologistCodes[value as string] || value
          : value

      return (
        <LabelAndValue
          key={option.label}
          label={option.label}
          value={
            (secondsToAddIn.includes(option.key)
              ? `${displayValue} seconds`
              : displayValue) as string
          }
        />
      )
    })}
  </Flex>
)

export default EctListView
