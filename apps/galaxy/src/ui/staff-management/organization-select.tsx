'use client'

import React from 'react'
import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const OrganizationSelect = () => {
  const options = useCodesetOptions(CODESETS.Gender)
  return (
    <FormFieldContainer className="w-full flex-row items-center gap-1">
      <FormFieldLabel>Organization</FormFieldLabel>
      <DropdownSelect field="organization" options={options} />
    </FormFieldContainer>
  )
}
export { OrganizationSelect }
