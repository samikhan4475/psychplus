import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const DefaultProviderSelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel className="!text-1">Def. Provider</FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.ProviderType}
        name="defaultProviderStaffId"
        className="min-w-[126px] flex-1"
        size="1"
      />
    </FormFieldContainer>
  )
}

export { DefaultProviderSelect }
