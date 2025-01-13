import { Flex } from '@radix-ui/themes'
import {
  BlockLabel,
  FormFieldContainer,
  FormFieldError,
  TextAreaInput,
} from '@/components'

const AdditionalTherapyDetailBlock = () => {
  return (
    <FormFieldContainer className="flex flex-grow flex-row items-start justify-start">
      <BlockLabel className="flex-none self-start" required>
        Additional Therapy Details
      </BlockLabel>

      <Flex className=" w-full max-w-full flex-grow flex-col">
        <TextAreaInput
          field="additionalTherapyDetail"
          className="mb-4 h-[90px] w-full max-w-full flex-grow"
        />
        <FormFieldError name={'additionalTherapyDetail'} />
      </Flex>
    </FormFieldContainer>
  )
}

export { AdditionalTherapyDetailBlock }
