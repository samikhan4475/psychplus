import { Flex } from '@radix-ui/themes'
import { AutoResizeInput, BlockLabel, FormFieldError } from '@/components'

const OtherBlock = () => {
  return (
    <Flex align="start" gap="2">
      <BlockLabel>Other</BlockLabel>
      <Flex align="start" gap="1" width="100%" direction="column">
        <AutoResizeInput
          field="other"
          className="w-full max-w-lg"
          maxLength={4000}
        />
        <FormFieldError name="other" />
      </Flex>
    </Flex>
  )
}

export { OtherBlock }
