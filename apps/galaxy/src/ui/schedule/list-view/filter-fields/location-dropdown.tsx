'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { MultiSelectField } from '@/components'
import { SelectOptionType } from '@/types'
import { searchLocationOptionsAction } from '../../client-actions'
import { useFiltersContext } from '../../context'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const MAX_LOCATIONS = 26
const LocationDropdown = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [clinicLocations, setClinicLocations] = useState<SelectOptionType[]>([])
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const { filters } = useFiltersContext()
  const stateIds = form.watch('stateIds')
  const locationIds = form.watch('locationIds')

  useEffect(() => {
    if (stateIds.length) {
      setLoading(true)
      searchLocationOptionsAction({ stateId: stateIds }).then((response) => {
        setLoading(false)
        if (response.state === 'error') {
          toast.error('Failed to fetch clinic locations')
        }
        setClinicLocations(response.state === 'error' ? [] : response.data)
      })
    }
  }, [stateIds])

  const handleLocationChange = (values: string[]) => {
    if (values.length > MAX_LOCATIONS && values.length > locationIds.length) {
      toast.error(`Maximum number of locations Selected`)
      form.setValue('locationIds', locationIds, { shouldDirty: true })
      return
    }
    form.setValue('locationIds', values, { shouldDirty: true })
    form.setValue('servicesOffered', [])
  }

  if (!filters.includes(SchedulerFilters.Location)) return null

  return (
    <FormFieldContainer className="h-full flex-1">
      <FieldLabel>Location</FieldLabel>
      <MultiSelectField
        disabled={!stateIds.length}
        defaultValues={locationIds}
        options={clinicLocations}
        className="flex-1"
        onChange={handleLocationChange}
        menuClassName="w-[155px]"
        loading={loading}
      />
    </FormFieldContainer>
  )
}

export { LocationDropdown }
