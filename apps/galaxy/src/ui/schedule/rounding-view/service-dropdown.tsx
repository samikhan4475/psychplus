'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel, SelectInput } from '@/components'
import { getLocationServicesAction } from '../actions'
import { Option } from '../types/calender'
import { FormFieldContainer } from '../shared'

const ServiceDropdown = () => {
  const form = useFormContext()
  const selectedLocation = form.watch('location')
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
      <SelectInput
        field="service"
        disabled={!selectedLocation}
        placeholder="Select"
        options={servicesOptions}
        buttonClassName="h-6 w-full"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { ServiceDropdown }
