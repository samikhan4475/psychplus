import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const ProviderTypeSelect = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Provider Type</FormFieldLabel>
      <CodesetSelect
        name="nonTimeProviderType"
        codeset={CODESETS.ProviderType}
        size="1"
        className="flex-1"
        disabled
      />
      <FormFieldError name={'nonTimeProviderType'} />
    </FormFieldContainer>
  )
}

export { ProviderTypeSelect }
