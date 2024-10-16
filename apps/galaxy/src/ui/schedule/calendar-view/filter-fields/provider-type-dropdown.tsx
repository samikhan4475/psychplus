import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '../../shared'

const ProviderTypeDropdown = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Provider Type</FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.ProviderType}
        size="1"
        className='flex-1'
        name="providerType"
      />
    </FormFieldContainer>
  )
}

export { ProviderTypeDropdown }
