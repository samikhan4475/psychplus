'use client'

import { useFormContext } from 'react-hook-form'
import { AsyncSelect } from '@/components'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { ProviderCodingSchema } from '../provider-coding-view-schema'
import { getClinicsOptionsAction } from '../../client-actions'

const LocationDropdown = () => {
  const form = useFormContext<ProviderCodingSchema>()
  return (
    <FormFieldContainer className="h-full flex-1">
      <FieldLabel>Location</FieldLabel>
      <AsyncSelect
        field="locationId"
        placeholder="Select"
        fetchOptions={getClinicsOptionsAction}
        buttonClassName="w-full h-6 max-w-[10px] min-w-full truncate"
        className="h-full flex-1"
        onValueChange={(value) => {
          form.setValue('locationIds', value, { shouldDirty: true })
          form.setValue('serviceIds', [])
        }}
      />
    </FormFieldContainer>
  )
}

export { LocationDropdown }
