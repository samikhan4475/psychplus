'use client'

import React from 'react'
import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const CredentialsSelect = () => {
  const options = useCodesetOptions(CODESETS.PractitionerHonor)
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Credentials</FormFieldLabel>
      <DropdownSelect field="credentials" options={options} />
    </FormFieldContainer>
  )
}
export { CredentialsSelect }
