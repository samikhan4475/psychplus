import { Flex } from '@radix-ui/themes'
import {
  AutoResizeInput,
  BlockLabel,
  FormFieldContainer,
  FormFieldError,
} from '@/components'

const AlcoholOtherBlock = () => {
  return (
    <FormFieldContainer className="w-full">
      <Flex align="start" gap="2" width="100%">
        <BlockLabel>Other</BlockLabel>
        <AutoResizeInput field="otherAlcoholDrugs" />
      </Flex>
      <FormFieldError name="otherAlcoholDrugs" />
    </FormFieldContainer>
  )
}

export { AlcoholOtherBlock }
