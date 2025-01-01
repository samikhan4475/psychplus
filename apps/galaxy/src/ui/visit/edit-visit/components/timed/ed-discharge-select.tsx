'use client'

import { useFormContext, useWatch } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SchemaType } from '../../schema'

const EDDischargeDropdown = () => {
  const form = useFormContext<SchemaType>()
  const visitType = useWatch({
    name: 'visitType',
    control: form.control,
  })
  const isDisabled = !visitType
  const options = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ]
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>ED Discharge</FormFieldLabel>
      <SelectInput
        field="edDischarge"
        buttonClassName="h-6 w-full"
        disabled={isDisabled}
        options={options}
      />
      <FormFieldError name="edDischarge" />
    </FormFieldContainer>
  )
}

export { EDDischargeDropdown }
