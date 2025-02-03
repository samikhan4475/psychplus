import { Flex } from '@radix-ui/themes'
import { AutoResizeInput, BlockLabel, FormFieldError } from '@/components'

const OtherBlock = () => {
  return (
    <>
      <Flex align="start" gap="2" width="100%">
        <BlockLabel>Other</BlockLabel>
        <AutoResizeInput field="hpiOther" />
      </Flex>
      <FormFieldError name="hpiOther" />
    </>
  )
}

export { OtherBlock }
