import { Flex } from '@radix-ui/themes'
import { CodesetSelect, FormFieldError, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const NoteTypeDropdown = () => {
  return (
    <Flex direction="column" className={'w-full gap-0.5'}>
      <FormFieldLabel className="text-1 leading-[16px]">
        Note Type
      </FormFieldLabel>
      <CodesetSelect
        name="noteType"
        codeset={CODESETS.NoteType}
        size="1"
        className="h-6 w-full"
      />
      <FormFieldError name="noteType" />
    </Flex>
  )
}

export { NoteTypeDropdown }
