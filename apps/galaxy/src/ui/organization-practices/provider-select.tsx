import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const ProviderSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Default Provider</FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.ProviderType}
        name="provider"
        className="flex-1 min-w-[126px]"
        size="1"
      />
    </FormFieldContainer>
  )
}

export { ProviderSelect }
