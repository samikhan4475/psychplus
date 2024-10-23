'use client'

import { getStaffOptionsAction } from '@/actions/get-staff'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'

const SupervisingProvider = () => {
  return (
    <FormFieldContainer className="flex-column">
      <FormFieldLabel>Supervising Provider</FormFieldLabel>
      <AsyncSelect
        field="supervisingProviderId"
        placeholder="Select"
        fetchOptions={getStaffOptionsAction}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { SupervisingProvider }
