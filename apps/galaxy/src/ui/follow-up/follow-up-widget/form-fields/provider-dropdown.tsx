'use client'

import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { Appointment } from '@/types'
import { getProvidersOptionsAction } from '@/ui/schedule/actions'

const ProviderDropdown = ({
  appointment,
  disabled,
}: {
  appointment?: Appointment
  disabled: boolean
}) => {
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>Provider</FormFieldLabel>
      <AsyncSelect
        field="provider"
        placeholder="Select"
        fetchOptions={() =>
          getProvidersOptionsAction(appointment?.providerType)
        }
        buttonClassName="w-full h-6"
        className="w-[150px]"
        disabled={disabled}
      />
    </FormFieldContainer>
  )
}

export { ProviderDropdown }
