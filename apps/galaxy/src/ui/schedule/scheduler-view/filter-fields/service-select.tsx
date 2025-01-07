'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { getLocationServicesAction } from '../../actions'
import { useServiceCodesMap } from '../../hooks'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { Option } from '../../types'
import { getServiceFilterOptions } from '../../utils'
import { SchemaType } from '../filter-actions-group'

const ServiceMultiSelect = () => {
  const form = useFormContext<SchemaType>()
  const [loading, setLoading] = useState<boolean>(false)
  const selectedLocation = form.watch('locationIds')
  const services = form.getValues('serviceIds')
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
