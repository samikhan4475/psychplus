import { Flex, Text } from '@radix-ui/themes'

const LabelAndValueColumn = ({
  label,
  value,
}: {
  label: string
  value: string
}) => {
  return (
    <Flex direction="column" gap="1">
      <Text className="whitespace-nowrap text-1 font-medium">{label}</Text>
      <Text className="text-1 font-regular">{value}</Text>
    </Flex>
  )
}

export { LabelAndValueColumn }
