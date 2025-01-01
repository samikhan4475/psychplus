import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODE_NOT_SET, CODESETS } from '@/constants'
import { FormFieldContainer } from '../../shared'

const ProviderTypeDropdown = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Provider Type</FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.ProviderType}
        size="1"
        exclude={[CODE_NOT_SET]}
        className='flex-1'
        name="providerType"
      />
    </FormFieldContainer>
  )
}

export { ProviderTypeDropdown }
