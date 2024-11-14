'use client'

import React from 'react'
import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const SupervisedBySelect = () => {
  const options = useCodesetOptions(CODESETS.Gender)
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Supervised By</FormFieldLabel>
      <DropdownSelect field="supervisedBy" options={options} />
    </FormFieldContainer>
  )
}
export { SupervisedBySelect }
