import { Flex } from '@radix-ui/themes'
import { BlockLabel, FormFieldError, TextInput } from '@/components-v2'

const OtherBlock = () => {
  return (
    <Flex align="center" gap="2">
      <BlockLabel>Other</BlockLabel>
      <Flex align="start" gap="1" width="100%" direction="column">
        <TextInput field="other" className="w-[400px]" maxLength={4000} />

        <FormFieldError name="other" />
      </Flex>
    </Flex>
  )
}

export { OtherBlock }
