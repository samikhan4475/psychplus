import React from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { getOptionLabel } from '@/utils'
import { useStore } from '../../store'
import { SchemaType } from './schema'

const StaffTypeSelect = () => {
  const form = useFormContext<SchemaType>()
  const staffs = useStore((state) => state.dropDownOptions.staffs)
  const staffRole = form.watch('staffUserRoleIds.0')
  const filteredOptions = staffs.filter((staff) => staff.value === staffRole)
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Staff Type</FormFieldLabel>
      <SelectInput
        options={filteredOptions}
        field="staffType"
        onValueChange={(val) => {
          const label = getOptionLabel(filteredOptions, val)
          form.setValue('staffType', val)
          form.setValue('staffTypeLabel', label)
        }}
        disabled={!filteredOptions?.length || !staffRole}
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="staffType" />
    </FormFieldContainer>
  )
}

export { StaffTypeSelect }
