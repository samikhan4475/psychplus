'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormFieldLabel, SelectInput } from '@/components'
import { getStateClinicsOptionsAction } from '../../actions'
import { FormFieldContainer } from '../../shared'
import { SchemaType } from '../filter-actions-group'

const LocationDropdown = () => {
  const [clinicLocations, setClinicLocations] = useState<
    { label: string; value: string }[]
  >([])
  const form = useFormContext<SchemaType>()
  const stateId = form.watch('stateId')

  useEffect(() => {
    if (stateId) {
      getStateClinicsOptionsAction(stateId).then((response) => {
        if (response.state === 'error') {
          toast.error('Failed to fetch clinic locations')
        }
        setClinicLocations(response.state === 'error' ? [] : response.data)
      })
    }
  }, [stateId])

  return (
    <FormFieldContainer className="h-full flex-1">
      <FormFieldLabel>Location</FormFieldLabel>
      <SelectInput
        field="locationIds"
        placeholder="Select"
        options={clinicLocations}
        disabled={!stateId}
        buttonClassName="h-6 w-full"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { LocationDropdown }
