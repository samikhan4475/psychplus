import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { SchemaType } from '../../schema'

const ProviderTypeDropdown = () => {
  const form = useFormContext<SchemaType>()
  const providerTypeCodes = useCodesetCodes(CODESETS.ProviderType)
  const service = form.watch('service')

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Provider Type</FormFieldLabel>
      <SelectInput
        field="nonTimeProviderType"
        options={providerTypeCodes.map((v) => ({
          label: v.display,
          value: v.value,
        }))}
        buttonClassName="flex-1"
        disabled={!service}
      />
      <FormFieldError name={'nonTimeProviderType'} />
    </FormFieldContainer>
  )
}

export { ProviderTypeDropdown }
