import {
  AutoResizeInput,
  BlockLabel,
  FormFieldError,
  ReadMoreDialog,
  TextInput,
} from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { cn } from '@/utils'
import { Flex } from '@radix-ui/themes'

interface OtherBlockProps {
  data?: QuickNoteSectionItem[]
  disabled?: boolean
}
const OtherBlock = ({ data, disabled = false }: OtherBlockProps) => {
  return (
    <>
      <Flex align="start" gap="2" width="100%" className={cn({
        "pointer-events-none": disabled
      })}>
        <BlockLabel>Other</BlockLabel>
        {
          disabled ? <TextInput field='hpiOther' disabled /> :
            <AutoResizeInput field="hpiOther" maxLength={4000} disabled={disabled} />
        }
        <ReadMoreDialog data={data} />
      </Flex>
      <FormFieldError name="hpiOther" />

    </>
  )
}

export { OtherBlock }
