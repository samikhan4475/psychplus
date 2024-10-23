'use client'

import { getStaffOptionsAction } from '@/actions/get-staff'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'

const AttendingProvider = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Attending Provider</FormFieldLabel>
      <AsyncSelect
        field="attendingProviderId"
        placeholder="Select"
        fetchOptions={getStaffOptionsAction}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { AttendingProvider }
