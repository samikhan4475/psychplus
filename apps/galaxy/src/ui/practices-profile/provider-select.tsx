import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const DefaultProviderSelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel className="!text-1">Def. Provider</FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.ProviderType}
        name="provider"
        className="flex-1 min-w-[126px]"
        size="1"
      />
    </FormFieldContainer>
  )
}

export { DefaultProviderSelect }
