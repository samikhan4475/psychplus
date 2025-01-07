'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { getLocationServicesAction } from '../../actions'
import { useFiltersContext } from '../../context'
import { useServiceCodesMap } from '../../hooks'
import { BookedAppointmentsSchemaType } from '../../schema'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { Option, SchedulerFilters } from '../../types'
import { getServiceFilterOptions } from '../../utils'

const ServiceMultiSelect = () => {
  const form = useFormContext<BookedAppointmentsSchemaType>()
  const { filters } = useFiltersContext()
  const [loading, setLoading] = useState<boolean>(false)
  const selectedLocation = form.watch('locationId')
  const services = form.watch('serviceIds')
  const [servicesOptions, setServicesOptions] = useState<Option[]>([])
  const mappedServices = useServiceCodesMap()

  useEffect(() => {
    if (selectedLocation) {
      setLoading(true)
      getLocationServicesAction(selectedLocation).then((response) => {
        setLoading(false)
        if (response.state === 'error') setServicesOptions([])
        else setServicesOptions(response.data)
      })
    }
  }, [selectedLocation])

  if (!filters.includes(SchedulerFilters.Service)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Service</FieldLabel>
      <MultiSelectField
        disabled={!selectedLocation}
        defaultValues={services}
        options={getServiceFilterOptions(mappedServices, servicesOptions)}
        className="flex-1"
        onChange={(values) => form.setValue('serviceIds', values)}
        menuClassName="w-[155px]"
        loading={loading}
      />
    </FormFieldContainer>
  )
}

export { ServiceMultiSelect }
