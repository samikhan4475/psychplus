'use client'

import {
  DateInput as AriaDateInput,
  DateField,
  DateSegment,
  Label,
} from 'react-aria-components'
import { Controller, useFormContext } from 'react-hook-form'

interface DateInputProps {
  label?: string
  autoFocus?: boolean
  field: string
}

const DateInput = ({ label, field: fieldName, autoFocus }: DateInputProps) => {
  const form = useFormContext()

  return (
    <Controller
      control={form.control}
      name={fieldName}
      rules={{ required: 'Required' }}
      render={({
        field: { name, value, onChange, onBlur, ref },
        fieldState: { invalid, error },
      }) => (
        <DateField
          autoFocus={autoFocus}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          isRequired
          // Let React Hook Form handle validation instead of the browser.
          validationBehavior="aria"
          aria-label="Date input"
          isInvalid={invalid}
        >
          {label && <Label>{label}</Label>}
          <AriaDateInput>
            {(segment) => <DateSegment segment={segment} />}
          </AriaDateInput>
        </DateField>
      )}
    />
  )
}

export { DateInput }
