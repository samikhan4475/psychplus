import { useFormContext, type Path } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@psychplus/ui/form'
import { Select } from '@psychplus/ui/select'
import { useReferralStatusOptions } from '../hooks'
import { type SchemaType } from './edit-referral-form'

const FIELD_NAME: Path<SchemaType> = 'resourceStatus'
const FIELD_ID = 'referral-referral-status-selector'

const ReferralStatusSelector = () => {
  const form = useFormContext<SchemaType>()
  const options = useReferralStatusOptions()

  return (
    <FormFieldContainer>
      <FormFieldLabel id={FIELD_ID}>Referral Status</FormFieldLabel>
      <Select.Root
        size="3"
        name={FIELD_NAME}
        value={form.watch(FIELD_NAME)}
        onValueChange={(value) => form.setValue(FIELD_NAME, value)}
      >
        <Select.Trigger placeholder="Select status" id={FIELD_ID} />
        <Select.Content>
          {options.map((option) => (
            <Select.Item value={option.value} key={option.value}>
              {option.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <FormFieldError name={FIELD_NAME} />
    </FormFieldContainer>
  )
}

export { ReferralStatusSelector }
