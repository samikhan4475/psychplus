'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SchemaType } from '../../schema'

const EDDischargeDropdown = () => {
  const form = useFormContext<SchemaType>()
  const visitType = form.watch('visitType')

  const isDisabled = !visitType

  const options = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
  ]

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>ED Discharge</FormFieldLabel>
      <SelectInput
        field="edDischarge"
        options={options}
        buttonClassName="flex-1"
        disabled={isDisabled}
      />
      <FormFieldError name="edDischarge" />
    </FormFieldContainer>
  )
}

export { EDDischargeDropdown }
