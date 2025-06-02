import { Flex } from '@radix-ui/themes'
import { AutoResizeInput, BlockLabel, FormFieldError } from '@/components'

const OtherBlock = () => {
  return (
    <>
      <Flex align="start" gap="2" width="100%" className="mt-2">
        <BlockLabel required>Other</BlockLabel>
        <AutoResizeInput field="udsOther" maxLength={4000} />
      </Flex>
      <FormFieldError name="udsOther" />
    </>
  )
}

export { OtherBlock }
