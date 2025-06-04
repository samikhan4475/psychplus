'use client'

import React, { useCallback } from 'react'
import { useParams } from 'next/navigation'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getOrganizationOptionsAction } from './actions'
import { FEATURE_TYPES } from './constants'

const OrganizationSelect = () => {
  const { type, id } = useParams<{ type: string; id: string }>()
  let payload: { practiceId?: string; organizationId?: string } = {}

  if (type === FEATURE_TYPES.PRACTICE) {
    payload = { practiceId: id }
  } else if (type === FEATURE_TYPES.ORGANIZATION) {
    payload = { organizationId: id }
  }

  const fetchOptions = useCallback(() => {
    if (!id) return Promise.resolve({ state: 'success' as const, data: [] })
    return getOrganizationOptionsAction({ payload })
  }, [id, type])

  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel>Organization</FormFieldLabel>
      <AsyncSelect
        disabled={type === FEATURE_TYPES.ORGANIZATION}
        fetchOptions={fetchOptions}
        field="organizationsIds.[0]"
        className="w-full"
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { OrganizationSelect }
