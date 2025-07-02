'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { getLocationServiceOfferedOptionsAction } from '../../client-actions'
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
  const selectedLocations = form.watch('locationIds')
  const services = form.watch('servicesOffered')
  const [servicesOptions, setServicesOptions] = useState<Option[]>([])
  const mappedServices = useServiceCodesMap()

  useEffect(() => {
    if (selectedLocations.length) {
      setLoading(true)
      getLocationServiceOfferedOptionsAction(selectedLocations).then(
        (response) => {
          setLoading(false)
          if (response.state === 'error') setServicesOptions([])
          else setServicesOptions(response.data)
        },
      )
    }
  }, [selectedLocations])

  if (!filters.includes(SchedulerFilters.Service)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Service</FieldLabel>
      <MultiSelectField
        disabled={!selectedLocations.length}
        defaultValues={services}
        options={getServiceFilterOptions(mappedServices, servicesOptions)}
        className="flex-1"
        onChange={(values) =>
          form.setValue('servicesOffered', values, { shouldDirty: true })
        }
        menuClassName="w-[155px]"
        loading={loading}
      />
    </FormFieldContainer>
  )
}

export { ServiceMultiSelect }
