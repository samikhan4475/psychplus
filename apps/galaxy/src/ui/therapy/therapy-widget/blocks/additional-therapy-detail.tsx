import { Flex } from '@radix-ui/themes'
import {
  BlockLabel,
  FormFieldContainer,
  FormFieldError,
  ReadMoreDialog,
  TextAreaInput,
} from '@/components'
import { QuickNoteSectionItem } from '@/types'

interface AdditionalTherapyDetailBlockProps {
  otherData?: QuickNoteSectionItem[]
}
const AdditionalTherapyDetailBlock = ({
  otherData,
}: AdditionalTherapyDetailBlockProps) => {
  return (
    <FormFieldContainer className="flex flex-grow flex-row items-start justify-start">
      <BlockLabel className="flex-none self-start" required>
        Additional Therapy Details
      </BlockLabel>
      <Flex className="w-full max-w-full flex-grow flex-col">
        <Flex direction="row" gap="1" align="end" width="100%">
          <TextAreaInput
            field="additionalTherapyDetail"
            className="mb-4 h-[90px] w-full max-w-full flex-grow"
            formContainerClassName="!w-fit"
          />
          <ReadMoreDialog data={otherData} />
        </Flex>
        <FormFieldError name={'additionalTherapyDetail'} />
      </Flex>
    </FormFieldContainer>
  )
}

export { AdditionalTherapyDetailBlock }
