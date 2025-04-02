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
        name="noteTypeCode"
        codeset={CODESETS.NoteType}
        groupingCodes={['Secondary']}
        size="1"
        className="h-6 w-full"
      />
      <FormFieldError name="noteTypeCode" />
    </Flex>
  )
}

export { NoteTypeDropdown }
