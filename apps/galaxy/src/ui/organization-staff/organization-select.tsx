'use client'

import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getOrganizationOptionsAction } from './actions'

const OrganizationSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Organization</FormFieldLabel>
      <AsyncSelect
        field="organizationsIds.[0]"
        fetchOptions={getOrganizationOptionsAction}
        className="w-full"
        disabled
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { OrganizationSelect }
