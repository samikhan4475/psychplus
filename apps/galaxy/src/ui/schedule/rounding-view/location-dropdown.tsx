'use client'

import { useFormContext } from 'react-hook-form'
import { AsyncSelect } from '@/components'
import { getClinicsOptionsAction } from '../client-actions'
import { BookedAppointmentsSchemaType } from '../schema'
import { FieldLabel, FormFieldContainer } from '../shared'

const LocationDropdown = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const fieldValues = form.watch('locationIds')

  return (
    <FormFieldContainer className="h-full flex-1">
      <FieldLabel>Location</FieldLabel>
      <AsyncSelect
        field="locationId"
        placeholder="Select"
        fetchOptions={getClinicsOptionsAction}
        buttonClassName="h-6 w-full truncate max-w-[10px] min-w-full"
        className="h-full flex-1"
        value={fieldValues[0] ?? ''}
        onValueChange={(value) => {
          form.setValue('locationIds', [value], { shouldDirty: true })
          form.setValue('serviceIds', [])
        }}
      />
    </FormFieldContainer>
  )
}

export { LocationDropdown }
