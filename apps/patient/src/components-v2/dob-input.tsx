'use client'

import { DateField, DateInput, DateSegment } from 'react-aria-components'
import { Controller, useFormContext } from 'react-hook-form'

interface DobInputProps {
  name: string
}

const DobInput = ({ name }: DobInputProps) => {
  const form = useFormContext()

  return (
    <Controller
      control={form.control}
      name={name}
      render={({
        field: { name, value, onChange, onBlur },
        fieldState: { invalid },
      }) => (
        <DateField
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          isRequired
          validationBehavior="aria"
          aria-label="date of birth input"
          isInvalid={invalid}
        >
          <DateInput>
            {(segment) => <DateSegment segment={segment} />}
          </DateInput>
        </DateField>
      )}
    />
  )
}

export { DobInput }
