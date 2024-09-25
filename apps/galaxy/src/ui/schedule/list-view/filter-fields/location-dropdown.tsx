'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormFieldLabel, SelectInput } from '@/components'
import { getStateClinicsOptionsAction } from '../../actions'
import { useFiltersContext } from '../../context'
import { FormFieldContainer } from '../../shared'
import { type ListViewSchema } from '../list-view-schema'
import { SchedulerFilters } from '../../constants'

const LocationDropdown = () => {
  const [clinicLocations, setClinicLocations] = useState<
    { label: string; value: string }[]
  >([])
  const form = useFormContext<ListViewSchema>()
  const { filters } = useFiltersContext()
  const stateId = form.watch('state')

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

  if (!filters.includes(SchedulerFilters.Location)) return null

  return (
    <FormFieldContainer className="h-full flex-1">
      <FormFieldLabel className="text-[12px]">Location</FormFieldLabel>
      <SelectInput
        field="location"
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
