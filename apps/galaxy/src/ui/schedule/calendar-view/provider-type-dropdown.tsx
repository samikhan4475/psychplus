import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from './form-field-container'

const ProviderTypeDropdown = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="text-[12px]">Provider Type</FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.ProviderType}
        size="1"
        name="providerType"
      />
    </FormFieldContainer>
  )
}

export { ProviderTypeDropdown }
