'use client'

import React from 'react'
import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const PracticeSelect = () => {
  const options = useCodesetOptions(CODESETS.Gender)
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Practice</FormFieldLabel>
      <DropdownSelect field="practice" options={options} />
    </FormFieldContainer>
  )
}
export { PracticeSelect }
