'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { DropdownSelect } from '@/components'
import { SelectOptionType } from '@/types'
import { getClinicsOptionsAction } from '../../client-actions'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FieldLabel, FormFieldContainer } from '../../shared'

const LocationDropdown = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const fieldValues = form.watch('locationIds')
  const [loading, setLoading] = useState<boolean>(false)
  const [clinicLocations, setClinicLocations] = useState<SelectOptionType[]>([])

  useEffect(() => {
    setLoading(true)
    getClinicsOptionsAction().then((response) => {
      setLoading(false)
      if (response.state === 'error') {
        toast.error('Failed to fetch clinic locations')
      }
      setClinicLocations(response.state === 'error' ? [] : response.data)
    })
  }, [])

  return (
    <FormFieldContainer className="h-full flex-1">
      <FieldLabel>Location</FieldLabel>
      <DropdownSelect
        field="locationsIds"
        fieldValue={fieldValues[0] ?? ''}
        options={clinicLocations}
        className='h-full'
        onValueChange={(val) => {
          form.setValue('locationIds', [val], { shouldDirty: true })
          form.setValue('serviceIds', [])
        }}
        loading={loading}
        buttonClassName='min-w-1 max-w-full truncate'
      />
    </FormFieldContainer>
  )
}

export { LocationDropdown }
