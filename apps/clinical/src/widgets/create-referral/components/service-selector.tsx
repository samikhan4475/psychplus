import { useFormContext, type Path } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@psychplus/ui/form'
import { Select } from '@psychplus/ui/select'
import { useServiceOptions } from '../hooks'
import { type SchemaType } from './create-referral-form'

const FIELD_NAME: Path<SchemaType> = 'service'
const FIELD_ID = 'referral-service-selector'

const ServiceSelector = () => {
  const form = useFormContext<SchemaType>()
  const options = useServiceOptions()

  return (
    <FormFieldContainer>
      <FormFieldLabel id={FIELD_ID}>Service</FormFieldLabel>
      <Select.Root
        size="3"
        name={FIELD_NAME}
        onValueChange={(value) => form.setValue(FIELD_NAME, value)}
      >
        <Select.Trigger placeholder="Select a service" id={FIELD_ID} />
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

export { ServiceSelector }
