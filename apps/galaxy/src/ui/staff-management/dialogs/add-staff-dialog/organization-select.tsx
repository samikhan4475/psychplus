'use client'

import React from 'react'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { useStore } from '../../store'

const OrganizationSelect = () => {
  const organizations = useStore((state) => state.dropDownOptions.organizations)

  return (
    <FormFieldContainer>
      <FormFieldLabel required>Primary Organization</FormFieldLabel>
      <SelectInput
        options={organizations}
        disabled={organizations.length === 0}
        field="organizationIds.[0]"
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="organizationIds.[0]" />
    </FormFieldContainer>
  )
}

export { OrganizationSelect }
