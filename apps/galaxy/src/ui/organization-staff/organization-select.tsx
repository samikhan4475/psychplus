'use client'

import { useParams } from 'next/navigation'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getOrganizationOptionsAction } from './actions'
import { FEATURE_TYPES } from './constants'

const OrganizationSelect = () => {
  const { type } = useParams<{ type: string }>()

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Organization</FormFieldLabel>
      <AsyncSelect
        field="organizationsIds.[0]"
        fetchOptions={getOrganizationOptionsAction}
        className="w-full"
        disabled={type === FEATURE_TYPES.ORGANIZATION}
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { OrganizationSelect }
