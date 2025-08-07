'use client'

import { getProvidersOptionsAction } from '@/actions'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'

const PrescriberSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Prescriber</FormFieldLabel>
      <AsyncSelect
        field="staffId"
        placeholder="Select"
        fetchOptions={getProvidersOptionsAction}
        buttonClassName="w-full h-6"
        className="h-full w-[144px] flex-1"
      />
    </FormFieldContainer>
  )
}

export { PrescriberSelect }
