'use client'

import { getStaffOptionsAction } from '@/actions/get-staff'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'

const RenderingProvider = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required={true}>Rendering Provider</FormFieldLabel>
      <AsyncSelect
        field="renderingProviderId"
        placeholder="Select"
        fetchOptions={getStaffOptionsAction}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { RenderingProvider }
