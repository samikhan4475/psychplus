'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormFieldLabel, SelectInput } from '@/components'
import { SelectOptionType } from '@/types'
import { getStateClinicsOptionsAction } from '../../actions'
import { useFiltersContext } from '../../context'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const LocationDropdown = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [clinicLocations, setClinicLocations] = useState<SelectOptionType[]>([])
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const { filters } = useFiltersContext()
  const stateIds = form.watch('stateIds')

  useEffect(() => {
    if (stateIds.length) {
      setLoading(true)
      // @TODO: use updated api for fetching locations based on multiple states selected
      getStateClinicsOptionsAction(stateIds[0]).then((response) => {
        setLoading(false)
        if (response.state === 'error') {
          toast.error('Failed to fetch clinic locations')
        }
        setClinicLocations(response.state === 'error' ? [] : response.data)
      })
    }
  }, [stateIds])

  if (!filters.includes(SchedulerFilters.Location)) return null

  return (
    <FormFieldContainer className="h-full flex-1">
      <FormFieldLabel className="text-[12px]">Location</FormFieldLabel>
      <SelectInput
        field="locationId"
        placeholder="Select"
        options={clinicLocations}
        loading={loading}
        disabled={!stateIds.length}
        buttonClassName="h-6 w-full"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { LocationDropdown }
