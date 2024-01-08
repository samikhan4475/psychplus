import { useFormContext, type Path } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@psychplus/ui/form'
import { Select } from '@psychplus/ui/select'
import { useStatusLabel } from '../hooks'
import { type SchemaType } from './edit-referral-form'

const FIELD_NAME: Path<SchemaType> = 'servicesStatus'
const FIELD_ID = 'referral-service-status-selector'

const ServiceStatusSelector = () => {
  const form = useFormContext<SchemaType>()
  const value = form.getValues(FIELD_NAME)

  return (
    <FormFieldContainer>
      <FormFieldLabel id={FIELD_ID}>Service Status</FormFieldLabel>
      <Select.Root
        size="3"
        name={FIELD_NAME}
        value={form.getValues(FIELD_NAME)}
        disabled
      >
        <Select.Trigger id={FIELD_ID} />
        <Select.Content>
          <Select.Item value={value} key={value}>
            {useStatusLabel(value)}
          </Select.Item>
        </Select.Content>
      </Select.Root>
      <FormFieldError name={FIELD_NAME} />
    </FormFieldContainer>
  )
}

export { ServiceStatusSelector }
