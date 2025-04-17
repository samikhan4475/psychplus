'use client'

import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  AsyncSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { getOrganizationOptionsAction } from './actions'

const OrganizationField = () => {
  const form = useFormContext()
  const { organizationId } = form.watch()

  const fetchOptions = useCallback(() => {
    if (!organizationId)
      return Promise.resolve({ state: 'success' as const, data: [] })
    return getOrganizationOptionsAction({ organizationId })
  }, [organizationId])

  return (
    <FormFieldContainer>
      <FormFieldLabel className="!text-1">Organization</FormFieldLabel>
      <AsyncSelect
        field="organizationId"
        placeholder="Select"
        fetchOptions={fetchOptions}
        buttonClassName="w-full border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none]"
        tooltip
        disabled
      />
      <FormFieldError name="organizationId" />
    </FormFieldContainer>
  )
}

export { OrganizationField }
