'use client'

import { useCallback } from 'react'
import { getProvidersOptionsAction } from '@/actions'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { Appointment } from '@/types'

const ProviderDropdown = ({
  appointment,
  disabled,
}: {
  appointment?: Appointment
  disabled: boolean
}) => {
  const fetchProviderOptions = useCallback(
    () => getProvidersOptionsAction(appointment?.providerType),
    [appointment?.providerType],
  )
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>Provider</FormFieldLabel>
      <AsyncSelect
        field="provider"
        placeholder="Select"
        fetchOptions={fetchProviderOptions}
        buttonClassName="w-full h-6"
        className="w-[150px]"
        disabled={disabled}
      />
    </FormFieldContainer>
  )
}

export { ProviderDropdown }
