import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { useStore } from '../../store'
import { SchemaType } from './schema'

const StaffTypeSelect = () => {
  const form = useFormContext<SchemaType>()
  const staffs = useStore((state) => state.dropDownOptions.staffs)
  return (
    <FormFieldContainer>
      <FormFieldLabel>Staff Type</FormFieldLabel>
      <SelectInput
        options={staffs}
        field="staffType"
        onValueChange={(type) => {
          form.setValue('staffType', type)
          form.setValue('staffUserRoleIds.0', '')
        }}
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { StaffTypeSelect }
