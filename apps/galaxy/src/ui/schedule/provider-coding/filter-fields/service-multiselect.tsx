'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { useServiceCodesMap } from '../../hooks'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { Option } from '../../types'
import { getServiceFilterOptions } from '../../utils'
import { getLocationServicesAction } from '../../client-actions'
import { ProviderCodingSchema } from '../provider-coding-view-schema'

const ServiceMultiSelect = () => {
  const form = useFormContext<ProviderCodingSchema>()
  const [loading, setLoading] = useState<boolean>(false)
  const selectedLocation = form.watch('locationIds')
  const services = form.watch('servicesOffered')
  const [servicesOptions, setServicesOptions] = useState<Option[]>([])
  const mappedServices = useServiceCodesMap()

  useEffect(() => {
    if (selectedLocation) {
      setLoading(true)
      getLocationServicesAction([selectedLocation]).then((response) => {
        setLoading(false)
        if (response.state === 'error') setServicesOptions([])
        else setServicesOptions(response.data)
      })
    }
  }, [selectedLocation])

  return (
    <FormFieldContainer className="flex-1">
      <FieldLabel>Service</FieldLabel>
      <MultiSelectField
        disabled={!selectedLocation}
        defaultValues={services}
        options={getServiceFilterOptions(mappedServices, servicesOptions)}
        className="flex-1"
        onChange={(values) => form.setValue('servicesOffered', values)}
        menuClassName="w-[155px]"
        loading={loading}
      />
    </FormFieldContainer>
  )
}

export { ServiceMultiSelect }
