import { Flex } from '@radix-ui/themes'
import {
  AutoResizeInput,
  BlockLabel,
  FormFieldError,
  ReadMoreDialog,
} from '@/components'
import { QuickNoteSectionItem } from '@/types'

interface OtherBlockProps {
  data?: QuickNoteSectionItem[]
}
const OtherBlock = ({ data }: OtherBlockProps) => {
  return (
    <>
      <Flex align="start" gap="2" width="100%">
        <BlockLabel>Other</BlockLabel>
        <AutoResizeInput field="hpiOther" /> <ReadMoreDialog data={data} />
      </Flex>
      <FormFieldError name="hpiOther" />
    </>
  )
}

export { OtherBlock }
