import { Flex, Text } from '@radix-ui/themes'

const LabelAndValue = ({
  label,
  value,
}: {
  label: string
  value: string | number
}) => {
  return (
    <Flex direction="column">
      <Text as="div" size="2" weight="bold">
        {label}
      </Text>
      <Text as="div" color="gray" size="2">
        {value}
      </Text>
    </Flex>
  )
}

export default LabelAndValue
