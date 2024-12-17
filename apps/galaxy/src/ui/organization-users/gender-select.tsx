import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const GenderSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Gender</FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.Gender}
        name="gender"
        className="flex-1 min-w-[125px]"
        size="1"
      />
    </FormFieldContainer>
  )
}

export { GenderSelect }
