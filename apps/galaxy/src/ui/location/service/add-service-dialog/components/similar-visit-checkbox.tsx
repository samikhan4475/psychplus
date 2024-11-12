import { Checkbox, Flex, Text } from '@radix-ui/themes'


const SimilarVisitCheck = () => {
  return (
    <Text as="label" className="text-[12px] text-pp-black-3 leading-4">
      <Flex gap="1" align="center">
        <Checkbox />
        Create similar visit for medical provider
      </Flex>
    </Text>
  )
}

export {SimilarVisitCheck};