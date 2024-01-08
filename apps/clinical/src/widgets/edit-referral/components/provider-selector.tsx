import { useFormContext, type Path } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@psychplus/ui/form'
import { ProviderSearchDropdown } from '@psychplus/ui/provider-search-dropdown'
import { type SchemaType } from './edit-referral-form'

const FIELD_NAME: Path<SchemaType> = 'referredByName'
const FIELD_ID = 'referral-provider-selector'

const ProviderSelector = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer>
      <FormFieldLabel id={FIELD_ID}>Referring Provider</FormFieldLabel>
      <ProviderSearchDropdown
        initialValue={form.getValues(FIELD_NAME)}
        disabled
      />
      <FormFieldError name={FIELD_NAME} />
    </FormFieldContainer>
  )
}

export { ProviderSelector }
