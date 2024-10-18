'use client'

import { useFormContext, useWatch } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SchemaType } from '../../schema'

const UptoSelect = () => {
  const form = useFormContext<SchemaType>()
  const frequency = useWatch({
    control: form.control,
    name: 'frequency',
  })
  const options = Array.from({ length: 6 }, (_, i) => ({
    label: `${i + 1} Week${i + 1 > 1 ? 's' : ''}`,
    value: `${i + 1}`,
  }))
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Upto</FormFieldLabel>
      <SelectInput
        field="upto"
        options={options}
        buttonClassName="h-6 w-full"
        disabled={!frequency}
      />
      <FormFieldError name="upto" />
    </FormFieldContainer>
  )
}

export { UptoSelect }
