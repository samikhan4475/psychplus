'use client'
import React, { useEffect, useMemo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { SelectOptionType } from '@/types'
import { getOptionLabel } from '@/utils'
import { SchemaType } from './schema'

interface StaffTypeSelectProps {
  staffs: SelectOptionType[]
}

const StaffTypeSelect = ({ staffs }: StaffTypeSelectProps) => {
  const form = useFormContext<SchemaType>()
  const [staffRole, staffTypeLabel, staffType] = useWatch({
    control: form.control,
    name: ['staffUserRoleIds.0', 'staffTypeLabel', 'staffTypeIds.0'],
  })
  const options = staffs?.filter((staff) => staff.value === staffRole)
  const label = useMemo(
    () => getOptionLabel(options, staffType),
    [options, staffType],
  )
  useEffect(() => {
    if (label !== staffTypeLabel) {
      form.setValue('staffTypeLabel', label)
    }
  }, [label, staffTypeLabel])
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Staff Type</FormFieldLabel>
      <SelectInput
        options={options}
        field="staffTypeIds.0"
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        disabled
      />
    </FormFieldContainer>
  )
}

export { StaffTypeSelect }

