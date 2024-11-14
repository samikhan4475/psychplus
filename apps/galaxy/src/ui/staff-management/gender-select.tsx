'use client'

import React from 'react'
import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const GenderSelect = () => {
  const options = useCodesetOptions(CODESETS.Gender)
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Gender</FormFieldLabel>
      <DropdownSelect field="gender" options={options} />
    </FormFieldContainer>
  )
}
export { GenderSelect }
