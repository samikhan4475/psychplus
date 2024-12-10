'use client'

import React from 'react'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { useStore } from './store'

const OrganizationSelect = () => {
  const organizations = useStore((state) => state.dropDownOptions.organizations)

  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel>Organization</FormFieldLabel>
      <SelectInput
        options={organizations}
        disabled={organizations.length === 0}
        field="organizationsIds.[0]"
        className="w-full"
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { OrganizationSelect }
