'use client'

import { useFormContext } from 'react-hook-form'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { getClinicsOptionsAction } from '../client-actions'
import { ActiveVisitSchemaType } from './schema'

const LocationSelect = () => {
  const form = useFormContext<ActiveVisitSchemaType>()

  return (
    <FormFieldContainer className="gap-0.5">
      <FormFieldLabel>Location</FormFieldLabel>
      <AsyncSelect
        field="locationId"
        placeholder="Select"
        fetchOptions={getClinicsOptionsAction}
        onValueChange={(value) => {
          form.setValue('locationId', value)
          form.setValue('serviceId', '')
        }}
        size="1"
        buttonClassName="border-pp-gray-2 h-6 border border-solid w-full !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { LocationSelect }
