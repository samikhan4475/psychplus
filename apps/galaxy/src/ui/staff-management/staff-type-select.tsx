'use client'

import React from 'react'
import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const StaffTypeSelect = () => {
  const options = useCodesetOptions(CODESETS.Gender)
  return (
    <FormFieldContainer className="w-auto flex-row items-center gap-1">
      <FormFieldLabel>Staff Type</FormFieldLabel>
      <DropdownSelect field="staffType" options={options} />
    </FormFieldContainer>
  )
}
export { StaffTypeSelect }
