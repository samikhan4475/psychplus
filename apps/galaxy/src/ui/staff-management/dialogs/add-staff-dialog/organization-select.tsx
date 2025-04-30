'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import {
  AsyncSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { getOrganizationOptionsAction } from '../../actions'
import { FEATURE_TYPES } from '../../constants'

const OrganizationSelect = () => {
  const { id, type } = useParams<{ id: string; type: string }>()

  return (
    <FormFieldContainer>
      <FormFieldLabel required>Primary Organization</FormFieldLabel>
      <AsyncSelect
        disabled={FEATURE_TYPES.ORGANIZATION === type}
        fetchOptions={() =>
          getOrganizationOptionsAction({ payload: { organizationId: id } })
        }
        field="organizationIds.[0]"
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="organizationIds.[0]" />
    </FormFieldContainer>
  )
}

export { OrganizationSelect }
