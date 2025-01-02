'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { SchedulingHistorySchemaType } from '../filter-form'

const DcHospitalField = () => {
  const form = useFormContext<SchedulingHistorySchemaType>()
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">DC Hospital Name</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Search by name"
        className="border-pp-gray-2 h-6 w-[122px] border border-solid !outline-none [box-shadow:none]"
        {...form.register('dischargeHospitalName')}
      />
    </FormFieldContainer>
  )
}

export { DcHospitalField }
