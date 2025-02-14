'use client'

import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getOrganizationOptionsAction } from '../../actions'

const OrganizationSelect = () => {
  return (
    <FormFieldContainer className="flex w-full">
      <FormFieldLabel required>Organization</FormFieldLabel>
      <AsyncSelect
        field="organizationIds.[0]"
        fetchOptions={getOrganizationOptionsAction}
        disabled
        buttonClassName="h-6 w-full"
      />
    </FormFieldContainer>
  )
}

export { OrganizationSelect }
