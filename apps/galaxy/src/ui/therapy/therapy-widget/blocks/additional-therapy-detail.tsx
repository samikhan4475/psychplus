import { Flex } from '@radix-ui/themes'
import {
  AutoResizeInput,
  BlockLabel,
  FormFieldContainer,
  FormFieldError,
  ReadMoreDialog,
} from '@/components'
import { QuickNoteSectionItem } from '@/types'

interface AdditionalTherapyDetailBlockProps {
  otherData?: QuickNoteSectionItem[]
  required?: boolean
}
const AdditionalTherapyDetailBlock = ({
  otherData,
  required,
}: AdditionalTherapyDetailBlockProps) => {
  return (
    <FormFieldContainer className="flex flex-grow flex-row items-start justify-start">
      <BlockLabel className="flex-none self-start" required={required}>
        Additional Therapy Details
      </BlockLabel>
      <Flex className="w-full max-w-full flex-grow flex-col">
        <Flex direction="row" gap="1" align="end" width="100%">
          <AutoResizeInput
            className="min-h-[80px] min-w-[765px]"
            field="additionalTherapyDetail"
            maxLength={4000}
          />
          <ReadMoreDialog data={otherData} />
        </Flex>
        <FormFieldError name={'additionalTherapyDetail'} />
      </Flex>
    </FormFieldContainer>
  )
}

export { AdditionalTherapyDetailBlock }
