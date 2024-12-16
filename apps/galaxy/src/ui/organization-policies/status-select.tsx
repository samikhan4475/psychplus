import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const StatusSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Status</FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.RecordStatus}
        name="status"
        className="flex-1 min-w-[125px]"
        size="1"
      />
    </FormFieldContainer>
  )
}

export { StatusSelect }
