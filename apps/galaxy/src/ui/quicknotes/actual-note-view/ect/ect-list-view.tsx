import { Flex, Text } from '@radix-ui/themes'
import { EctWidgetSchemaType } from '@/ui/procedures/ect-tab/ect-tab-schema'
import { LabelAndValue } from '../shared'

interface EctListViewProps {
  label?: string
  keys: { label: string; key: string }[]
  data: EctWidgetSchemaType
}

const EctListView = ({ label, keys, data }: EctListViewProps) => (
  <Flex direction="column">
    {label && (
      <Text className="whitespace-nowrap text-1 font-medium">{label}</Text>
    )}
    {keys.map((option) => (
      <LabelAndValue
        key={option.label}
        label={option.label}
        value={option.key ? data[option.key as keyof EctWidgetSchemaType] : ''}
      />
    ))}
  </Flex>
)

export default EctListView
