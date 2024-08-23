import { DateField, DateInput, DateSegment } from 'react-aria-components'
import { Controller, useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { type CreateUserSchema } from './schema'

const DobInput = () => {
  const form = useFormContext<CreateUserSchema>()

  return (
    <FormFieldContainer>
      <FormFieldLabel required>Date of Birth</FormFieldLabel>
      <Controller
        control={form.control}
        name="dob"
        rules={{ required: 'Required' }}
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <DateField
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            isRequired
            // Let React Hook Form handle validation instead of the browser.
            validationBehavior="aria"
            aria-label="patient date of birth input"
            isInvalid={invalid}
          >
            <DateInput>
              {(segment) => <DateSegment segment={segment} />}
            </DateInput>
          </DateField>
        )}
      />
      <FormFieldError name="dob" />
    </FormFieldContainer>
  )
}

export { DobInput }
