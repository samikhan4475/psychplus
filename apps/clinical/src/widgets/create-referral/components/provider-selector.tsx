import { useFormContext, type Path } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@psychplus/ui/form'
import { ProviderSearchDropdown } from '@psychplus/ui/provider-search-dropdown'
import { isPrescriber, useStaff } from '@psychplus/user'
import { useStore } from '../store'
import { type SchemaType } from './create-referral-form'

const FIELD_NAME: Path<SchemaType> = 'referredByName'
const FIELD_ID = 'referral-provider-selector'

const ProviderSelector = () => {
  const form = useFormContext<SchemaType>()
  const staff = useStaff(useStore)

  return (
    <FormFieldContainer>
      <FormFieldLabel id={FIELD_ID}>Referring Provider</FormFieldLabel>
      <ProviderSearchDropdown
        disabled={isPrescriber(staff)}
        initialValue={form.getValues(FIELD_NAME)}
        onChange={(value) => {
          form.setValue(FIELD_NAME, {
            avatar: value.avatar,
            firstName: value.firstName,
            lastName: value.lastName,
            honors: value.honors,
          })
        }}
      />
      <FormFieldError name={FIELD_NAME} />
    </FormFieldContainer>
  )
}

export { ProviderSelector }
