import { CodesetSelect } from '@/components'
import { CODE_NOT_SET, CODESETS } from '@/constants'
import { FieldLabel, FormFieldContainer } from '../../shared'

const ProviderTypeDropdown = () => {
  return (
    <FormFieldContainer>
      <FieldLabel>Provider Type</FieldLabel>
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
