'use client'

import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getProviderOptionsAction } from '../actions'

const AttendingProvider = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Attending Provider</FormFieldLabel>
      <AsyncSelect
        field="attendingProviderId"
        placeholder="Select"
        fetchOptions={getProviderOptionsAction}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { AttendingProvider }
