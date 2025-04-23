'use client'

import { getProvidersOptionsAction } from '@/actions'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'

const PrescriberSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Prescriber</FormFieldLabel>
      <AsyncSelect
        field="prescribingStaffId"
        buttonClassName="border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none] w-[120px]"
        fetchOptions={getProvidersOptionsAction}
        size="1"
      />
    </FormFieldContainer>
  )
}

export { PrescriberSelect }
