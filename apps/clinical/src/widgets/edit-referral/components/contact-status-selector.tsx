import { useFormContext, type Path } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@psychplus/ui/form'
import { Select } from '@psychplus/ui/select'
import { useContactStatusOptions } from '../hooks'
import { type SchemaType } from './edit-referral-form'

const FIELD_NAME: Path<SchemaType> = 'contactStatus'
const FIELD_ID = 'referral-contact-status-selector'

const ContactStatusSelector = () => {
  const form = useFormContext<SchemaType>()
  const options = useContactStatusOptions()

  return (
    <FormFieldContainer>
      <FormFieldLabel id={FIELD_ID}>Contact Status</FormFieldLabel>
      <Select.Root
        size="3"
        name={FIELD_NAME}
        value={form.watch(FIELD_NAME)}
        onValueChange={(value) => form.setValue(FIELD_NAME, value)}
      >
        <Select.Trigger placeholder="Not Contacted" id={FIELD_ID} />
        <Select.Content>
          {options.map((option) => (
            <Select.Item
              value={option.value}
              key={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <FormFieldError name={FIELD_NAME} />
    </FormFieldContainer>
  )
}

export { ContactStatusSelector }
