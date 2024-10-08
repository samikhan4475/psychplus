'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel, MultiSelectField } from '@/components'
import { getLocationServicesAction } from '../actions'
import { FormFieldContainer } from '../shared'
import { Option } from '../types/calender'

const ServiceDropdown = () => {
  const form = useFormContext()
  const selectedLocation = form.watch('locationId')
  const services = form.getValues('serviceIds')
  const [servicesOptions, setServicesOptions] = useState<Option[]>([])

  useEffect(() => {
    if (selectedLocation) {
      getLocationServicesAction(selectedLocation).then((response) => {
        if (response.state === 'error') setServicesOptions([])
        else setServicesOptions(response.data)
      })
    }
  }, [selectedLocation])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>Service</FormFieldLabel>
      <MultiSelectField
        disabled={!selectedLocation}
        defaultValues={services}
        options={servicesOptions}
        className="flex-1"
        onChange={(values) => form.setValue('serviceIds', values)}
        menuClassName="w-[155px]"
      />
    </FormFieldContainer>
  )
}

export { ServiceDropdown }
