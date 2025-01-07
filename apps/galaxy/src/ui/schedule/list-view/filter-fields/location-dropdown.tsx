'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { SelectInput } from '@/components'
import { SelectOptionType } from '@/types'
import { searchLocationOptionsAction } from '../../actions'
import { useFiltersContext } from '../../context'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FieldLabel, FormFieldContainer } from '../../shared'
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
      searchLocationOptionsAction({ stateId: stateIds }).then((response) => {
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
      <FieldLabel>Location</FieldLabel>
      <SelectInput
        field="locationId"
        placeholder="Select"
        options={clinicLocations}
        loading={loading}
        disabled={!stateIds.length}
        buttonClassName="h-6 w-full max-w-[10px] min-w-full truncate"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { LocationDropdown }
