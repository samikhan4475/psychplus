import { useFormContext, type Path } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@psychplus/ui/form'
import { Select } from '@psychplus/ui/select'
import { useForceServiceStatus, useServiceStatusOptions } from '../hooks'
import { type SchemaType } from './create-referral-form'

const FIELD_NAME: Path<SchemaType> = 'servicesStatus'
const FIELD_ID = 'referral-service-status-selector'

const ServiceStatusSelector = () => {
  const form = useFormContext<SchemaType>()

  const { statusOptions, allowEmergencyStatus, emergencyStatusOnly } =
    useServiceStatusOptions()

  useForceServiceStatus({
    allowEmergencyStatus,
    emergencyStatusOnly,
  })

  return (
    <FormFieldContainer>
      <FormFieldLabel id={FIELD_ID}>Service Status</FormFieldLabel>
      <Select.Root
        size="3"
        name={FIELD_NAME}
        value={form.watch(FIELD_NAME)}
        onValueChange={(value) => form.setValue(FIELD_NAME, value)}
      >
        <Select.Trigger placeholder="Select service status" id={FIELD_ID} />
        <Select.Content>
          {statusOptions.map((option) => (
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

export { ServiceStatusSelector }
