'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormFieldLabel, SelectInput } from '@/components'
import { SelectOptionType } from '@/types'
import { getStateClinicsOptionsAction } from '../../actions'
import { FormFieldContainer } from '../../shared'
import { SchemaType } from '../filter-actions-group'

const LocationDropdown = () => {
  const [clinicLocations, setClinicLocations] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const form = useFormContext<SchemaType>()
  const stateId = form.watch('stateId')

  useEffect(() => {
    if (stateId) {
      setLoading(true)
      getStateClinicsOptionsAction(stateId).then((response) => {
        setLoading(false)
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
        loading={loading}
      />
    </FormFieldContainer>
  )
}

export { LocationDropdown }
