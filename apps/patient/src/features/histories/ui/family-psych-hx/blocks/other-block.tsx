import { AutoResizeInput, BlockLabel, FormFieldError } from '@/components-v2'
import { Flex } from '@radix-ui/themes'

const OtherBlock = () => {
  return (
    <Flex align={{ initial: 'start', md: 'center' }} direction={{ initial: 'column', md: 'row' }} gap="2">
      <BlockLabel>Other</BlockLabel>
      <Flex align="start" gap="1" width="100%" direction="column">
        <AutoResizeInput
          field={'other'}
          className="w-full md:w-[400px]"
          maxLength={4000}
        />
        <FormFieldError name="other" />
      </Flex>
    </Flex>
  )
}

export { OtherBlock }
