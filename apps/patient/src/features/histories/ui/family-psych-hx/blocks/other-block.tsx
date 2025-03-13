import { Flex } from '@radix-ui/themes'
import { AutoResizeInput, BlockLabel, FormFieldError } from '@/components-v2'

const OtherBlock = () => {
  return (
    <Flex align="center" gap="2">
      <BlockLabel>Other</BlockLabel>
      <Flex align="start" gap="1" width="100%" direction="column">
        <AutoResizeInput
          field={'other'}
          className="w-[400px]"
          maxLength={4000}
        />
        <FormFieldError name="other" />
      </Flex>
    </Flex>
  )
}

export { OtherBlock }
