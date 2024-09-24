import { Flex, Text } from '@radix-ui/themes'

const AimsFooter = () => {
  return (
    <Flex direction="column" mt="4">
      <Text size="1">
        1. A total score of items 1-7 (Categories I, II, III) can be calculated.
        These represent observed movements.
      </Text>
      <Text size="1">2. Item 8 can be used as an overall severity index.</Text>
      <Text size="1">
        3. Items 9 (incapacitation) and 10 (awareness) provide additional
        information that may be useful in clinical decision making.
      </Text>
      <Text size="1">
        4. Items 11 (dental status) and 12 (dentures) provide information that
        may be useful in determining lip, jaw and tongue movements.
      </Text>
    </Flex>
  )
}
export { AimsFooter }
