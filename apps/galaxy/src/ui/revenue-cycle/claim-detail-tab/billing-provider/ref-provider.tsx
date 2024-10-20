'use client'

import { getStaffOptionsAction } from '@/actions/get-staff'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'

const RefProvider = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Ref. Provider</FormFieldLabel>
      <AsyncSelect
        field="referringProviderId"
        placeholder="Select"
        fetchOptions={getStaffOptionsAction}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { RefProvider }
