'use client'

import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getClinicsOptionsAction } from '@/ui/schedule/client-actions'

const LocationDropdown = ({ disabled }: { disabled: boolean }) => {
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="text-[12px]">Location</FormFieldLabel>
      <AsyncSelect
        field="location"
        placeholder="Select Location"
        fetchOptions={getClinicsOptionsAction}
        buttonClassName="w-full h-6"
        className="w-[150px]"
        disabled={disabled}
      />
    </FormFieldContainer>
  )
}

export { LocationDropdown }
