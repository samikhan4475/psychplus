'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel, MultiSelectField } from '@/components'
import { getLocationServicesAction } from '../../actions'
import { FormFieldContainer } from '../../shared'
import { Option } from '../../types/calender'

const ServiceMultiSelect = () => {
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
      <MultiSelectField
        disabled={!selectedLocation}
        options={servicesOptions}
        className="flex-1"
        menuClassName="w-[155px]"
      />
    </FormFieldContainer>
  )
}

export { ServiceMultiSelect }
