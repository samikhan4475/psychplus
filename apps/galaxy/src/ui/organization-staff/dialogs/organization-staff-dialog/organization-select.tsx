'use client'

import { useParams } from 'next/navigation'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getOrganizationOptionsAction } from '../../actions'

const OrganizationSelect = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <FormFieldContainer className="flex w-full">
      <FormFieldLabel required>Organization</FormFieldLabel>
      <AsyncSelect
        field="organizationIds.[0]"
        fetchOptions={() =>
          getOrganizationOptionsAction({ payload: { organizationId: id } })
        }
        disabled
        buttonClassName="h-6 w-full"
      />
    </FormFieldContainer>
  )
}

export { OrganizationSelect }
