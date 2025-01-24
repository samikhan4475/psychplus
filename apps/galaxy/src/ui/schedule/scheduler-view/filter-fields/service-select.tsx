'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { MultiSelectField } from '@/components'
import { getLocationServicesAction } from '../../client-actions'
import { useServiceCodesMap } from '../../hooks'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { Option } from '../../types'
import { getServiceFilterOptions } from '../../utils'
import { SchemaType } from '../filter-actions-group'

const ServiceMultiSelect = () => {
  const form = useFormContext<SchemaType>()
  const [loading, setLoading] = useState<boolean>(false)
  const selectedLocations = form.watch('locationIds')
  const services = form.getValues('serviceIds')
  const [servicesOptions, setServicesOptions] = useState<Option[]>([])
  const mappedServices = useServiceCodesMap()

  useEffect(() => {
    if (selectedLocations.length) {
      setLoading(true)
      getLocationServicesAction(selectedLocations).then((response) => {
        setLoading(false)
        if (response.state === 'error') setServicesOptions([])
        else setServicesOptions(response.data)
      })
    }
  }, [selectedLocations])

  return (
    <FormFieldContainer>
      <FieldLabel>Service</FieldLabel>
      <MultiSelectField
        disabled={!selectedLocations.length}
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
