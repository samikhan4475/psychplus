import { Flex } from '@radix-ui/themes'
import {
  AutoResizeInput,
  BlockLabel,
  FormFieldContainer,
  FormFieldError,
} from '@/components'

const TobaccoOtherBlock = () => {
  return (
    <FormFieldContainer className="w-full">
      <Flex align="start" gap="2" width="100%">
        <BlockLabel>Other</BlockLabel>
        <AutoResizeInput field="otherTobacco" />
      </Flex>
      <FormFieldError name="otherTobacco" />
    </FormFieldContainer>
  )
}

export { TobaccoOtherBlock }
