import { Flex } from '@radix-ui/themes'
import { AutoResizeInput, BlockLabel, FormFieldError } from '@/components'

const OtherBlock = ({ editable = true }: { editable?: boolean }) => {
  return (
    <>
      <Flex align="start" gap="2" width="100%" className="mt-2">
        <BlockLabel required>Other</BlockLabel>
        <AutoResizeInput
          field="udsOther"
          maxLength={4000}
          disabled={!editable}
        />
      </Flex>
      <FormFieldError name="udsOther" />
    </>
  )
}

export { OtherBlock }
