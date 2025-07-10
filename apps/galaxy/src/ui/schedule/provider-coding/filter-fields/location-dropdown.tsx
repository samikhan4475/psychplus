'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { DropdownSelect } from '@/components'
import { SelectOptionType } from '@/types'
import { getClinicsOptionsAction } from '../../client-actions'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { ProviderCodingSchema } from '../provider-coding-view-schema'

const LocationDropdown = () => {
  const form = useFormContext<ProviderCodingSchema>()
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
        field="locationIds"
        options={clinicLocations}
        className="h-full"
        onValueChange={(value) => {
          form.setValue('locationIds', value, { shouldDirty: true })
          form.setValue('servicesOffered', [])
        }}
        loading={loading}
        buttonClassName="min-w-1 max-w-full truncate"
      />
    </FormFieldContainer>
  )
}

export { LocationDropdown }
